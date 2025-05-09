import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Project Partnership (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
		await prisma.projectPartnership.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a project partnership", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		await prisma.municipality.create({
			data: {
				name: "São Paulo",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "SP",
				unitType: "MUNICIPALITY",
				userId: user.id,
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/municipality/project-partnership")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				term: "Termo de Parceria 2024",
				agency: "Agência de Desenvolvimento",
				objective: "Desenvolvimento de projetos sociais",
				status: "ACTIVE",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const projectPartnership = await prisma.projectPartnership.findFirst({
			where: {
				term: "Termo de Parceria 2024",
			},
		});

		expect(projectPartnership).toBeTruthy();
		expect(projectPartnership?.term).toEqual("Termo de Parceria 2024");
		expect(projectPartnership?.agency).toEqual("Agência de Desenvolvimento");
		expect(projectPartnership?.objective).toEqual(
			"Desenvolvimento de projetos sociais"
		);
		expect(projectPartnership?.status).toEqual("ACTIVE");
	});

	it("should not be able to create a project partnership with existing term", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		await prisma.municipality.create({
			data: {
				name: "São Paulo",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "SP",
				unitType: "MUNICIPALITY",
				userId: user.id,
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		// First project partnership creation
		await request(app.server)
			.post("/municipality/project-partnership")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				term: "Termo de Parceria 2024",
				agency: "Agência de Desenvolvimento",
				objective: "Desenvolvimento de projetos sociais",
				status: "ACTIVE",
				userId: user.id,
			});

		// Second project partnership creation attempt
		const response = await request(app.server)
			.post("/municipality/project-partnership")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				term: "Termo de Parceria 2024",
				agency: "Nova Agência",
				objective: "Novo objetivo",
				status: "ACTIVE",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Parceria com esse termo já cadastrada!"],
			data: null,
		});
	});

	it("should not be able to create a project partnership without municipality", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/municipality/project-partnership")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				term: "Termo de Parceria 2024",
				agency: "Agência de Desenvolvimento",
				objective: "Desenvolvimento de projetos sociais",
				status: "ACTIVE",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: [
				"Cadastre um município antes de cadastrar uma parceria de projeto!",
			],
			data: null,
		});
	});

	it("should not be able to create a project partnership without token", async () => {
		const response = await request(app.server)
			.post("/municipality/project-partnership")
			.send({
				term: "Termo de Parceria 2024",
				agency: "Agência de Desenvolvimento",
				objective: "Desenvolvimento de projetos sociais",
				status: "ACTIVE",
				userId: "any-user-id",
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});
});

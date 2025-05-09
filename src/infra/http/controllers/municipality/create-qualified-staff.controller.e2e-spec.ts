import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Qualified Staff (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
		await prisma.qualifiedStaff.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a qualified staff", async () => {
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
			.post("/municipality/qualified-staff")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "João Silva",
				document: "12345678900",
				sector: "Tecnologia da Informação",
				education: "Bacharel em Ciência da Computação",
				experience: "5 anos em desenvolvimento de software",
				employmentType: "CLT",
				isResponsible: true,
				userId: user.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const qualifiedStaff = await prisma.qualifiedStaff.findFirst({
			where: {
				name: "João Silva",
			},
		});

		expect(qualifiedStaff).toBeTruthy();
		expect(qualifiedStaff?.name).toEqual("João Silva");
		expect(qualifiedStaff?.document).toEqual("12345678900");
		expect(qualifiedStaff?.sector).toEqual("Tecnologia da Informação");
		expect(qualifiedStaff?.education).toEqual(
			"Bacharel em Ciência da Computação"
		);
		expect(qualifiedStaff?.experience).toEqual(
			"5 anos em desenvolvimento de software"
		);
		expect(qualifiedStaff?.employmentType).toEqual("CLT");
		expect(qualifiedStaff?.isResponsible).toEqual(true);
	});

	it("should not be able to create a qualified staff with existing document", async () => {
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

		// First qualified staff creation
		await request(app.server)
			.post("/municipality/qualified-staff")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "João Silva",
				document: "12345678900",
				sector: "Tecnologia da Informação",
				education: "Bacharel em Ciência da Computação",
				experience: "5 anos em desenvolvimento de software",
				employmentType: "CLT",
				isResponsible: true,
				userId: user.id,
			});

		// Second qualified staff creation attempt
		const response = await request(app.server)
			.post("/municipality/qualified-staff")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "Maria Santos",
				document: "12345678900",
				sector: "Desenvolvimento",
				education: "Bacharel em Engenharia de Software",
				experience: "3 anos em desenvolvimento web",
				employmentType: "CLT",
				isResponsible: false,
				userId: user.id,
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Funcionário com esse CPF já cadastrado!"],
			data: null,
		});
	});

	it("should not be able to create a qualified staff without municipality", async () => {
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
			.post("/municipality/qualified-staff")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "João Silva",
				document: "12345678900",
				sector: "Tecnologia da Informação",
				education: "Bacharel em Ciência da Computação",
				experience: "5 anos em desenvolvimento de software",
				employmentType: "CLT",
				isResponsible: true,
				userId: user.id,
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: [
				"Cadastre um município antes de cadastrar um funcionário qualificado!",
			],
			data: null,
		});
	});

	it("should not be able to create a qualified staff without token", async () => {
		const response = await request(app.server)
			.post("/municipality/qualified-staff")
			.send({
				name: "João Silva",
				document: "12345678900",
				sector: "Tecnologia da Informação",
				education: "Bacharel em Ciência da Computação",
				experience: "5 anos em desenvolvimento de software",
				employmentType: "CLT",
				isResponsible: true,
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

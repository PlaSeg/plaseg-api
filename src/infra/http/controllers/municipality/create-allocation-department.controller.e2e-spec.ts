import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Allocation Department (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
		await prisma.allocationDepartment.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create an allocation department", async () => {
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

		const municipality = await prisma.municipality.create({
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
			.post("/municipality/allocation-department")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				municipalityId: municipality.id,
				description: "Departamento de Tecnologia",
				address: "Rua da Tecnologia, 123",
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const allocationDepartment = await prisma.allocationDepartment.findFirst({
			where: {
				description: "Departamento de Tecnologia",
			},
		});

		expect(allocationDepartment).toBeTruthy();
		expect(allocationDepartment?.description).toEqual(
			"Departamento de Tecnologia"
		);
	});

	it("should not be able to create an allocation department with existing description", async () => {
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

		const municipality = await prisma.municipality.create({
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

		// First allocation department creation
		await request(app.server)
			.post("/municipality/allocation-department")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				municipalityId: municipality.id,
				description: "Departamento de Tecnologia",
				address: "Rua da Tecnologia, 123",
			});

		// Second allocation department creation attempt
		const response = await request(app.server)
			.post("/municipality/allocation-department")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				municipalityId: municipality.id,
				description: "Departamento de Tecnologia",
				address: "Rua da Tecnologia, 456",
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Departamento já cadastrado."],
			data: null,
		});
	});

	it("should not be able to create an allocation department without token", async () => {
		const response = await request(app.server)
			.post("/municipality/allocation-department")
			.send({
				municipalityId: "any-municipality-id",
				description: "Departamento de Tecnologia",
				address: "Rua da Tecnologia, 123",
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});

	it("should not be able to create an allocation department with non-existent municipality", async () => {
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
			.post("/municipality/allocation-department")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				municipalityId: "non-existent-id",
				description: "Departamento de Tecnologia",
				address: "Rua da Tecnologia, 123",
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: [
				"Cadastre um município antes de cadastrar um setor de alocação!",
			],
			data: null,
		});
	});
});

import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Management (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
		await prisma.management.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a management", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MEMBER",
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
			role: user.role,
		});

		const response = await request(app.server)
			.post("/municipality/management")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				initialDate: new Date(),
				endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
				managerName: "João Silva",
				managerCpf: "12345678900",
				managerEmail: "joao.silva@example.com",
				managerAddress: "Rua A, 123",
				managerPhone: "11999999999",
				adminManagerName: "Maria Santos",
				adminManagerCpf: "98765432100",
				adminManagerEmail: "maria.santos@example.com",
				adminManagerAddress: "Rua B, 456",
				adminManagerPhone: "11988888888",
				legislationName: "Pedro Oliveira",
				legislationCpf: "45678912300",
				legislationEmail: "pedro.oliveira@example.com",
				legislationAddress: "Rua C, 789",
				legislationPhone: "11977777777",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const management = await prisma.management.findFirst({
			where: {
				managerName: "João Silva",
			},
		});

		expect(management).toBeTruthy();
		expect(management?.managerName).toEqual("João Silva");
		expect(management?.adminManagerName).toEqual("Maria Santos");
		expect(management?.legislationName).toEqual("Pedro Oliveira");
	});

	it("should not be able to create a management without municipality", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "MEMBER",
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const response = await request(app.server)
			.post("/municipality/management")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				initialDate: new Date(),
				endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
				managerName: "João Silva",
				managerCpf: "12345678900",
				managerEmail: "joao.silva@example.com",
				managerAddress: "Rua A, 123",
				managerPhone: "11999999999",
				adminManagerName: "Maria Santos",
				adminManagerCpf: "98765432100",
				adminManagerEmail: "maria.santos@example.com",
				adminManagerAddress: "Rua B, 456",
				adminManagerPhone: "11988888888",
				legislationName: "Pedro Oliveira",
				legislationCpf: "45678912300",
				legislationEmail: "pedro.oliveira@example.com",
				legislationAddress: "Rua C, 789",
				legislationPhone: "11977777777",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: ["Cadastre um município antes de cadastrar uma gestão!"],
			data: null,
		});
	});

	it("should not be able to create a management without token", async () => {
		const response = await request(app.server)
			.post("/municipality/management")
			.send({
				initialDate: new Date(),
				endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
				managerName: "João Silva",
				managerCpf: "12345678900",
				managerEmail: "joao.silva@example.com",
				managerAddress: "Rua A, 123",
				managerPhone: "11999999999",
				adminManagerName: "Maria Santos",
				adminManagerCpf: "98765432100",
				adminManagerEmail: "maria.santos@example.com",
				adminManagerAddress: "Rua B, 456",
				adminManagerPhone: "11988888888",
				legislationName: "Pedro Oliveira",
				legislationCpf: "45678912300",
				legislationEmail: "pedro.oliveira@example.com",
				legislationAddress: "Rua C, 789",
				legislationPhone: "11977777777",
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

import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Maintenance Contract (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
		await prisma.maintenanceContract.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a maintenance contract", async () => {
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
			role: user.role,
		});

		const response = await request(app.server)
			.post("/municipality/maintenance-contract")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				description: "Contrato de manutenção de equipamentos de TI",
				attachment: "contrato.pdf",
				municipalityId: municipality.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const maintenanceContract = await prisma.maintenanceContract.findFirst({
			where: {
				description: "Contrato de manutenção de equipamentos de TI",
			},
		});

		expect(maintenanceContract).toBeTruthy();
		expect(maintenanceContract?.description).toEqual(
			"Contrato de manutenção de equipamentos de TI"
		);
		expect(maintenanceContract?.attachment).toEqual("contrato.pdf");
		expect(maintenanceContract?.municipalityId).toEqual(municipality.id);
	});

	it("should not be able to create a maintenance contract without municipality", async () => {
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
			.post("/municipality/maintenance-contract")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				description: "Contrato de manutenção de equipamentos de TI",
				attachment: "contrato.pdf",
				municipalityId: "non-existent-municipality-id",
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: [
				"Cadastre um município antes de cadastrar um contrato de manutenção!",
			],
			data: null,
		});
	});

	it("should not be able to create a maintenance contract without token", async () => {
		const response = await request(app.server)
			.post("/municipality/maintenance-contract")
			.send({
				description: "Contrato de manutenção de equipamentos de TI",
				attachment: "contrato.pdf",
				municipalityId: "any-municipality-id",
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});
});

import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Create Municipality (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.user.deleteMany();
		await prisma.municipality.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a municipality", async () => {
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
			.post("/municipality")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "São Paulo",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "SP",
				unitType: "MUNICIPALITY",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const municipality = await prisma.municipality.findFirst({
			where: {
				name: "São Paulo",
			},
		});

		expect(municipality).toBeTruthy();
		expect(municipality?.name).toEqual("São Paulo");
	});

	it("should not be able to create a municipality with existing user", async () => {
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

		// First municipality creation
		await request(app.server)
			.post("/municipality")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "São Paulo",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "SP",
				unitType: "MUNICIPALITY",
				userId: user.id,
			});

		// Second municipality creation attempt
		const response = await request(app.server)
			.post("/municipality")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: "Rio de Janeiro",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "RJ",
				unitType: "MUNICIPALITY",
				userId: user.id,
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Município já cadastrado para esse usuário!"],
			data: null,
		});
	});

	it("should not be able to create a municipality without token", async () => {
		const response = await request(app.server).post("/municipality").send({
			name: "São Paulo",
			guardInitialDate: new Date(),
			guardCount: 10,
			trafficInitialDate: new Date(),
			trafficCount: 5,
			federativeUnit: "SP",
			unitType: "MUNICIPALITY",
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

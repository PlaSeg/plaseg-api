import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { describe, it, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { prisma } from "../../../database/prisma/prisma";
import { Role } from "../../../../domain/entities/value-objects/role";

describe("Get Administrators (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get all administrators", async () => {
		const user = makeUser({
			role: Role.adminMaster(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		await prisma.user.createMany({
			data: [
				{
					name: "Admin 01",
					email: "admin01@gmail.com",
					phone: "86999999999",
					document: "00000000000",
					password: "00000000",
					role: "ADMIN",
				},
				{
					name: "Admin 02",
					email: "admin02@gmail.com",
					phone: "86988889999",
					document: "11111111111",
					password: "00000000",
					role: "ADMIN",
				},
			],
		});

		const response = await request(app.server)
			.get("/admin")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.data).toEqual([
			{
				id: expect.any(String),
				name: "Admin 01",
				email: "admin01@gmail.com",
				phone: "86999999999",
				document: "00000000000",
				role: "ADMIN",
				createdAt: expect.any(String),
				updatedAt: null,
			},
			{
				id: expect.any(String),
				name: "Admin 02",
				email: "admin02@gmail.com",
				phone: "86988889999",
				document: "11111111111",
				role: "ADMIN",
				createdAt: expect.any(String),
				updatedAt: null,
			},
		]);
	});
});

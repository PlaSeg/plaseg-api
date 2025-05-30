import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";

describe("Get Municipality Users (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get municipality users", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678900",
			phone: "11999999999",
		});

		const municipality1 = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality1@example.com"),
			document: "98765432100",
			phone: "11988888888",
		});

		const municipality2 = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality2@example.com"),
			document: "45678912300",
			phone: "11977777777",
		});

		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role.toString(),
		});

		await prisma.user.create({
			data: {
				id: admin.id.toString(),
				name: admin.name,
				email: admin.email.toString(),
				document: admin.document,
				phone: admin.phone,
				password: admin.password,
				role: admin.role.toPrisma(),
				allowed: admin.allowed,
				createdAt: admin.createdAt,
				updatedAt: admin.updatedAt,
			},
		});

		await prisma.user.create({
			data: {
				id: municipality1.id.toString(),
				name: municipality1.name,
				email: municipality1.email.toString(),
				document: municipality1.document,
				phone: municipality1.phone,
				password: municipality1.password,
				role: municipality1.role.toPrisma(),
				allowed: municipality1.allowed,
				createdAt: municipality1.createdAt,
				updatedAt: municipality1.updatedAt,
			},
		});

		await prisma.user.create({
			data: {
				id: municipality2.id.toString(),
				name: municipality2.name,
				email: municipality2.email.toString(),
				document: municipality2.document,
				phone: municipality2.phone,
				password: municipality2.password,
				role: municipality2.role.toPrisma(),
				allowed: municipality2.allowed,
				createdAt: municipality2.createdAt,
				updatedAt: municipality2.updatedAt,
			},
		});

		const response = await request(app.server)
			.get("/municipality/users")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: [
				expect.objectContaining({
					id: municipality1.id.toString(),
					email: municipality1.email.toString(),
				}),
				expect.objectContaining({
					id: municipality2.id.toString(),
					email: municipality2.email.toString(),
				}),
			],
		});
	});
});

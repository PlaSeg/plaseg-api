import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";

describe("Patch Municipality User Allowed Status (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to toggle municipality user allowed status", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678900",
			phone: "11999999999",
		});

		const municipality = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality@example.com"),
			document: "98765432100",
			phone: "11988888888",
			allowed: false,
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
				id: municipality.id.toString(),
				name: municipality.name,
				email: municipality.email.toString(),
				document: municipality.document,
				phone: municipality.phone,
				password: municipality.password,
				role: municipality.role.toPrisma(),
				allowed: municipality.allowed,
				createdAt: municipality.createdAt,
				updatedAt: municipality.updatedAt,
			},
		});

		const response = await request(app.server)
			.patch(`/municipality/users/${municipality.id.toString()}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const updatedUser = await prisma.user.findUnique({
			where: {
				id: municipality.id.toString(),
			},
		});

		expect(updatedUser?.allowed).toBe(true);
	});

	it("should not be able to toggle municipality user allowed status with invalid user id", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin2@example.com"),
			document: "12345678901",
			phone: "11999999998",
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

		const response = await request(app.server)
			.patch("/municipality/users/invalid-id")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual({
			success: false,
			errors: expect.any(Array),
			data: null,
		});
	});

	it("should not be able to toggle allowed status of a non-municipality user", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin3@example.com"),
			document: "12345678902",
			phone: "11999999997",
		});

		const companyUser = makeUser({
			role: Role.company(),
			email: Email.create("company@example.com"),
			document: "98765432101",
			phone: "11988888887",
			allowed: false,
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
				id: companyUser.id.toString(),
				name: companyUser.name,
				email: companyUser.email.toString(),
				document: companyUser.document,
				phone: companyUser.phone,
				password: companyUser.password,
				role: companyUser.role.toPrisma(),
				allowed: companyUser.allowed,
				createdAt: companyUser.createdAt,
				updatedAt: companyUser.updatedAt,
			},
		});

		const response = await request(app.server)
			.patch(`/municipality/users/${companyUser.id.toString()}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(400);

		const unchangedUser = await prisma.user.findUnique({
			where: {
				id: companyUser.id.toString(),
			},
		});

		expect(unchangedUser?.allowed).toBe(false);
	});
});

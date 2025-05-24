import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";
import { makeProjectType } from "../../../../../test/factories/make-project-type";

async function createAdminUser() {
	return prisma.user.create({
		data: {
			name: "Admin",
			email: "admin@admin.com",
			password: await hash("12345678", 6),
			phone: "99999999999",
			document: "00000000000",
			role: "ADMIN",
		},
	});
}

describe("Create Project Type (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.field.deleteMany();
		await prisma.projectType.deleteMany();
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a project type", async () => {
		const adminUser = await createAdminUser();
		const projectType = makeProjectType();

		const accessToken = app.jwt.sign({
			sub: adminUser.id.toString(),
			role: adminUser.role,
		});

		const response = await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: projectType.name,
				fields: projectType.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		expect(response.statusCode).toBe(201);
		expect(response.body.success).toBe(true);
		expect(response.body.data).toBeNull();

		const projectTypeInDatabase = await prisma.projectType.findUnique({
			where: {
				name: projectType.name,
			},
			include: {
				fields: true,
			},
		});

		expect(projectTypeInDatabase).toBeTruthy();
		expect(projectTypeInDatabase?.fields).toHaveLength(2);
	});

	it("should not be able to create a project type with duplicate name", async () => {
		const adminUser = await createAdminUser();
		const projectType = makeProjectType();

		const accessToken = app.jwt.sign({
			sub: adminUser.id.toString(),
			role: adminUser.role,
		});

		await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: projectType.name,
				fields: projectType.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		const response = await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: projectType.name,
				fields: projectType.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		expect(response.statusCode).toBe(409);
		expect(response.body.success).toBeFalsy();
		expect(response.body.errors).toEqual(["O tipo de projeto com esse nome já existe!"]);
	});

	it("should not allow non-admin users to create project types", async () => {
		const user = await prisma.user.create({
			data: {
				name: "User",
				email: "user@user.com",
				password: await hash("12345678", 6),
				phone: "88888888888",
				document: "11111111111",
				role: "MUNICIPALITY",
			},
		});

		const projectType = makeProjectType();

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const response = await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: projectType.name,
				fields: projectType.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBeFalsy();
	});

	it("should not allow unauthenticated access", async () => {
		const projectType = makeProjectType();

		const response = await request(app.server)
			.post("/project-types")
			.send({
				name: projectType.name,
				fields: projectType.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBeFalsy();
	});
});

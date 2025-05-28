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

describe("Get Project Type By Id (e2e)", () => {
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

	it("should be able to list project types", async () => {
		const adminUser = await createAdminUser();
		const projectType1 = makeProjectType({ name: "Tipo 1" });

		const accessToken = app.jwt.sign({
			sub: adminUser.id.toString(),
			role: adminUser.role,
		});

		await request(app.server)
			.post("/project-types")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				name: projectType1.name,
				fields: projectType1.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value,
					parentId: field.fields ? field.fields[0]?.id.toString() : undefined,
				})),
			});

		console.log(projectType1.id.toString());
		const data = await request(app.server)
			.get(`/project-types`)
			.set("Authorization", `Bearer ${accessToken}`);

		const projectTypeId = data.body.data[0].id
		
		const response = await request(app.server)
			.get(`/project-types/${projectTypeId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: expect.objectContaining({
				name: projectType1.name.toString(),
			}),
		});
	});
});

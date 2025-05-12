import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";

describe("Delete Type (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to delete a type", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = await prisma.type.create({
			data: {
				description: "Tipo para exclusão",
				group: "SERVICE",
			},
		});

		const response = await request(app.server)
			.delete(`/types/${type.id}`)
			.set("Authorization", `Bearer ${accessToken}`);

		const deletedType = await prisma.type.findUnique({
			where: { id: type.id },
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
		expect(deletedType).toBeNull();
	});

	it("should not be able to delete a type with children", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const parentType = await prisma.type.create({
			data: {
				description: "Tipo pai",
				group: "CATEGORY",
				children: {
					create: [
						{
							description: "Tipo filho",
							group: "SUBCATEGORY",
						},
					],
				},
			},
		});

		const response = await request(app.server)
			.delete(`/types/${parentType.id}`)
			.set("Authorization", `Bearer ${accessToken}`);

		const type = await prisma.type.findUnique({
			where: { id: parentType.id },
		});

		expect(response.status).toBe(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não é possível excluir um tipo que possui subtipos"],
			data: null,
		});
		expect(type).not.toBeNull();
	});

	it("should not be able to delete a non-existent type", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const nonExistentId = "be69e71c-acff-44e1-bf9c-3c9672131350";

		const response = await request(app.server)
			.delete(`/types/${nonExistentId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			success: false,
			errors: ["Tipo não encontrado"],
			data: null,
		});
	});

	it("should not be able to delete a type without authorization", async () => {
		const typeId = "be69e71c-acff-44e1-bf9c-3c9672131350";

		const response = await request(app.server).delete(`/types/${typeId}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});

	it("should not be able to delete a type if user is not admin", async () => {
		const user = makeUser();

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const typeId = "be69e71c-acff-44e1-bf9c-3c9672131350";

		const response = await request(app.server)
			.delete(`/types/${typeId}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});
	});
});

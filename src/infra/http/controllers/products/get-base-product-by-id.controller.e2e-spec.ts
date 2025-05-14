import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

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

describe("Get Base Product By Id (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.baseProduct.deleteMany();
		await prisma.type.deleteMany();
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 404 if base product does not exist", async () => {
		const admin = await createAdminUser();
		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role,
		});

		const response = await request(app.server)
			.get(`/base-products/00000000-0000-0000-0000-000000000000`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.success).toBe(false);
		expect(response.body.data).toBeNull();
	});

	it("should return base product with its category tree", async () => {
		const admin = await createAdminUser();
		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role,
		});

		const category = await prisma.type.create({
			data: { description: "Categoria", group: "CATEGORY" },
		});
		
		const subcategory = await prisma.type.create({
			data: {
				description: "Subcategoria",
				group: "CATEGORY",
				parentId: category.id,
			},
		});
		const subsubcategory = await prisma.type.create({
			data: {
				description: "Subsubcategoria",
				group: "CATEGORY",
				parentId: subcategory.id,
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "P001",
				name: "Produto Base 1",
				technicalDescription: "Descrição técnica",
				budget1: 100,
				budget1Validity: new Date(),
				budget2: 200,
				budget2Validity: new Date(),
				budget3: 300,
				budget3Validity: new Date(),
				unitValue: 150,
				typeId: subsubcategory.id,
			},
		});

		const response = await request(app.server)
			.get(`/base-products/${baseProduct.id}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.baseProduct).toMatchObject({
			code: "P001",
			category: "Categoria",
			subcategory: "Subcategoria",
			subsubcategory: "Subsubcategoria",
		});
	});

	it("should not allow non-admin users to access base product by id", async () => {
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
		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const category = await prisma.type.create({
			data: { description: "Categoria", group: "CATEGORY" },
		});
		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "P002",
				name: "Produto Base 2",
				technicalDescription: "Descrição técnica 2",
				budget1: 110,
				budget1Validity: new Date(),
				budget2: 210,
				budget2Validity: new Date(),
				budget3: 310,
				budget3Validity: new Date(),
				unitValue: 160,
				typeId: category.id,
			},
		});

		const response = await request(app.server)
			.get(`/base-products/${baseProduct.id}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});

	it("should not allow unauthenticated access", async () => {
		const category = await prisma.type.create({
			data: { description: "Categoria", group: "CATEGORY" },
		});
		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "P003",
				name: "Produto Base 3",
				technicalDescription: "Descrição técnica 3",
				budget1: 120,
				budget1Validity: new Date(),
				budget2: 220,
				budget2Validity: new Date(),
				budget3: 320,
				budget3Validity: new Date(),
				unitValue: 170,
				typeId: category.id,
			},
		});

		const response = await request(app.server).get(
			`/base-products/${baseProduct.id}`
		);

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});
});

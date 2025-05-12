import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

// Helper para criar usuário admin
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

describe("Get Base Products (e2e)", () => {
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

	it("should return an empty list when there are no base products", async () => {
		const admin = await createAdminUser();
		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role,
		});

		const response = await request(app.server)
			.get("/base-products")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.baseProducts).toEqual([]);
	});

	it("should return base products with their category tree", async () => {
		const admin = await createAdminUser();
		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role,
		});

		// Cria árvore de categorias
		const category = await prisma.type.create({
			data: { description: "Categoria", group: "CATEGORY" },
		});
		const subcategory = await prisma.type.create({
			data: {
				description: "Subcategoria",
				group: "SUBCATEGORY",
				parentId: category.id,
			},
		});
		const subsubcategory = await prisma.type.create({
			data: {
				description: "Subsubcategoria",
				group: "SUBSUBCATEGORY",
				parentId: subcategory.id,
			},
		});

		// Cria produto base
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
			.get("/base-products")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.baseProducts).toHaveLength(1);
		const product = response.body.data.baseProducts[0];
		expect(product.code).toBe("P001");
		expect(product.category).toBe("Categoria");
		expect(product.subcategory).toBe("Subcategoria");
		expect(product.subsubcategory).toBe("Subsubcategoria");
	});

	it("should not allow non-admin users to access base products", async () => {
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

		const response = await request(app.server)
			.get("/base-products")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});

	it("should not allow unauthenticated access", async () => {
		const response = await request(app.server).get("/base-products");

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});
});

import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { prisma } from "../../../database/prisma/prisma";
import { buildApp } from "../../app";
import fastify, { FastifyInstance } from "fastify";
import { hash } from "bcrypt";

async function createAdminAndToken(app: FastifyInstance) {
	const user = await prisma.user.create({
		data: {
			name: "Admin",
			email: "admin@example.com",
			password: await hash("12345678", 6),
			document: "00000000000",
			phone: "99999999999",
			role: "ADMIN",
		},
	});

	const token = app.jwt.sign({
		sub: user.id.toString(),
		role: user.role,
	});

	return { user, token };
}

describe("GET /base-products/opportunity/:opportunityId (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return base products with budget info", async () => {
		const { token } = await createAdminAndToken(app);

		const type = await prisma.type.create({
			data: {
				description: "Categoria Teste",
				group: "CATEGORY",
			},
		});

		const opportunity = await prisma.opportunity.create({
			data: {
				title: "Oportunidade X",
                description: "Oportunidade de teste",
                slug: "oportunidade-x",
				availableValue: 10000,
				minValue: 1000,
				maxValue: 5000,
				initialDeadline: new Date(),
				finalDeadline: new Date(),
				responsibleAgency: "Agência de Teste",
				requiresCounterpart: false,
				counterpartPercentage: 0,
				type: {
					create: {
						description: "Tipo X",
						group: "OPPORTUNITY",
					},
				},
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "BP-001",
				name: "Produto Base 1",
				technicalDescription: "Descrição técnica",
				budget1: 100,
				budget1Validity: new Date(Date.now() + 86400000),
				budget2: 200,
				budget2Validity: new Date(Date.now() + 86400000),
				budget3: 300,
				budget3Validity: new Date(Date.now() + 86400000),
				unitValue: 150,
				typeId: type.id,
			},
		});
        
        await prisma.opportunityBaseProduct.create({
            data: {
                baseProductId: baseProduct.id.toString(),
                opportunityId: opportunity.id.toString()
            }
        })

		const response = await request(app.server)
			.get(`/base-products/opportunity/${opportunity.id}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.baseProducts).toHaveLength(1);

		const product = response.body.data.baseProducts[0];
		expect(product.id).toBe(baseProduct.id);
		expect(product.budget).toBe(200);
		expect(product.hasBudgets).toBe(true);
	});

	it("should return unitValue as budget when all budgets are 0 or null", async () => {
		const { token } = await createAdminAndToken(app);

		const type = await prisma.type.create({
			data: {
				description: "Categoria Teste 2",
				group: "CATEGORY",
			},
		});

		const opportunity = await prisma.opportunity.create({
			data: {
				title: "Oportunidade Sem Budget",
				description: "Descrição",
				slug: "sem-budget",
				availableValue: 5000,
				minValue: 500,
				maxValue: 2000,
				initialDeadline: new Date(),
				finalDeadline: new Date(),
				responsibleAgency: "Agência X",
				requiresCounterpart: false,
				counterpartPercentage: 0,
				type: {
					create: {
						description: "Tipo Y",
						group: "OPPORTUNITY",
					},
				},
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "BP-002",
				name: "Produto Base 2",
				technicalDescription: "Descrição técnica",
				budget1: 0,
				budget1Validity: new Date(),
				budget2: 0,
				budget2Validity: new Date(),
				budget3: 0,
				budget3Validity: new Date(),
				unitValue: 250,
				typeId: type.id,
			},
		});

		await prisma.opportunityBaseProduct.create({
			data: {
				baseProductId: baseProduct.id,
				opportunityId: opportunity.id,
			},
		});

		const response = await request(app.server)
			.get(`/base-products/opportunity/${opportunity.id}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.baseProducts).toHaveLength(1);

		const product = response.body.data.baseProducts[0];
		expect(product.budget).toBe(250);
		expect(product.hasBudgets).toBe(false);
	});
	
});

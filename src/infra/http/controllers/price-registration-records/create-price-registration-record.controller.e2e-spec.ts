import fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import { makePriceRegistrationRecord } from "../../../../../test/factories/make-price-registration-record";

describe("Create Price Registration Record (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a price registration record", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				password: await hash("00000000", 6),
				phone: "86988889999",
				document: "11111111111",
				role: "COMPANY",
			},
		});

		const company = await prisma.company.create({
			data: {
				cnpj: "12345678901234",
				legalName: "Acme Corp",
				tradeName: "Acme",
				address: "Rua Teste, 123",
				email: "acme@acme.com",
				phone: "86988889999",
				site: "https://acme.com",
				portfolioDescription: "Empresa de teste",
				userId: user.id,
			},
		});

		const type = await prisma.type.create({
			data: {
				description: "Test Type",
				group: "CATEGORY",
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "TEST-001",
				name: "Test Product",
				technicalDescription: "Test Description",
				budget1: 1000,
				budget1Validity: new Date(),
				budget2: 2000,
				budget2Validity: new Date(),
				budget3: 3000,
				budget3Validity: new Date(),
				unitValue: 500,
				typeId: type.id,
			},
		});

		const specificProduct = await prisma.specificProduct.create({
			data: {
				brand: "Test Brand",
				model: "Test Model",
				description: "Test Description",
				unitValue: 1000,
				warrantyMonths: 12,
				budget: 5000,
				budgetValidity: new Date(),
				baseProductId: baseProduct.id,
				companyId: company.id,
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const priceRegistrationRecord = makePriceRegistrationRecord();

		const response = await request(app.server)
			.post("/price-registration-records")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				number: priceRegistrationRecord.number,
				publicAgency: priceRegistrationRecord.publicAgency,
				year: priceRegistrationRecord.year,
				effectiveDate: priceRegistrationRecord.effectiveDate,
				status: priceRegistrationRecord.status,
				items: [
					{
						specificProductId: specificProduct.id,
						unitValue: 100,
						quantity: 1,
						minAdherenceQuantity: 1,
						maxAdherenceQuantity: 10,
					},
				],
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const priceRegistrationRecordInDatabase =
			await prisma.priceRegistrationRecord.findFirst({
				where: {
					number: priceRegistrationRecord.number,
				},
				include: {
					priceRegistrationRecordItems: true,
				},
			});

		expect(priceRegistrationRecordInDatabase).toBeTruthy();
		expect(priceRegistrationRecordInDatabase?.number).toEqual(
			priceRegistrationRecord.number
		);
		expect(
			priceRegistrationRecordInDatabase?.priceRegistrationRecordItems
		).toHaveLength(1);
	});
});

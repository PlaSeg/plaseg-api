import request from "supertest";
import { beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import { hash } from "bcrypt";
import fastify, { FastifyInstance } from "fastify";

describe("Get Price Registration Records (e2e)", () => {
	let app: FastifyInstance;
	let adminAccessToken: string;
	let companyId: string;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();

		const admin = await prisma.user.create({
			data: {
				name: "Admin",
				email: "admin@admin.com",
				password: await hash("12345678", 6),
				phone: "99999999999",
				document: "00000000000",
				role: "ADMIN",
			},
		});

		adminAccessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role,
		});
	});

	it("should return an empty list when there are no price registration records", async () => {
		const response = await request(app.server)
			.get("/price-registration-records")
			.set("Authorization", `Bearer ${adminAccessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.priceRegistrationRecords).toEqual([]);
	});

	it("should return price registration records with their items", async () => {
		const type = await prisma.type.create({
			data: {
				description: "Test Type",
				group: "CATEGORY",
			},
		});

		const user = await prisma.user.create({
			data: {
				name: "Company",
				email: "company@company.com",
				password: await hash("12345678", 6),
				phone: "99999999999",
				document: "00000000000",
				role: "COMPANY",
			},
		});

		const company = await prisma.company.create({
			data: {
				cnpj: "12345678901234",
				legalName: "Test Company",
				tradeName: "Test Company",
				address: "Test Address",
				email: "company@test.com",
				phone: "99999999999",
				site: "https://test.com",
				portfolioDescription: "Test Description",
				userId: user.id,
			},
		});

		companyId = company.id;

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "BP001",
				name: "Base Product 1",
				technicalDescription: "Test Description",
				budget1: 100,
				budget1Validity: new Date(),
				budget2: 200,
				budget2Validity: new Date(),
				budget3: 300,
				budget3Validity: new Date(),
				unitValue: 150,
				typeId: type.id,
			},
		});

		const specificProduct = await prisma.specificProduct.create({
			data: {
				brand: "Test Brand",
				model: "Test Model",
				description: "Test Description",
				unitValue: 100,
				warrantyMonths: 12,
				budget: 1000,
				budgetValidity: new Date(),
				baseProductId: baseProduct.id,
				companyId,
			},
		});

		await prisma.priceRegistrationRecord.create({
			data: {
				publicAgency: "Agency 1",
				number: "123",
				year: 2024,
				effectiveDate: new Date(),
				status: "ACTIVE",
				companyId,
				priceRegistrationRecordItems: {
					create: {
						specificProductId: specificProduct.id,
						unitValue: 100,
						quantity: 1,
						minAdherenceQuantity: 1,
						maxAdherenceQuantity: 10,
					},
				},
			},
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		const response = await request(app.server)
			.get("/price-registration-records")
			.set("Authorization", `Bearer ${adminAccessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.priceRegistrationRecords).toHaveLength(1);
		const returnedRecord = response.body.data.priceRegistrationRecords[0];
		expect(returnedRecord.publicAgency).toBe("Agency 1");
		expect(returnedRecord.number).toBe("123");
		expect(returnedRecord.items).toHaveLength(1);
		expect(returnedRecord.items[0].specificProductId).toBe(
			specificProduct.id.toString()
		);
	});

	it("should not allow non-authorized users to access price registration records", async () => {
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
			.get("/price-registration-records")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});

	it("should not allow unauthenticated access", async () => {
		const response = await request(app.server).get(
			"/price-registration-records"
		);

		expect(response.statusCode).toBe(401);
		expect(response.body.success).toBe(false);
	});
});

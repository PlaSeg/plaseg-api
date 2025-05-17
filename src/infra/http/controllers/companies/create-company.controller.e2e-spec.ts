import request from "supertest";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { prisma } from "../../../database/prisma/prisma";
import fastify, { FastifyInstance } from "fastify";
import { makeCompany } from "../../../../../test/factories/make-company";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { hash } from "bcrypt";

describe("Create Company (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a company", async () => {
		const user = await prisma.user.create({
			data: {
				name: "Acme",
				email: "acme@gmail.com",
				phone: "86988889999",
				document: "11111111111",
				password: await hash("00000000", 6),
				role: "COMPANY",
			},
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const company = makeCompany();

		const response = await request(app.server)
			.post("/company")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				cnpj: company.cnpj,
				legalName: company.legalName,
				tradeName: company.tradeName,
				address: company.address,
				email: company.email.toString(),
				phone: company.phone,
				site: company.site,
				portfolioDescription: company.portfolioDescription,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const companyInDatabase = await prisma.company.findFirst({
			where: {
				cnpj: company.cnpj,
			},
		});

		expect(companyInDatabase).toBeTruthy();
	});

	it("should not be able to create a company with invalid role", async () => {
		const user = makeUser({
			role: Role.member(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const company = makeCompany();

		const response = await request(app.server)
			.post("/company")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				cnpj: company.cnpj,
				legalName: company.legalName,
				tradeName: company.tradeName,
				address: company.address,
				email: company.email.toString(),
				phone: company.phone,
				site: company.site,
				portfolioDescription: company.portfolioDescription,
			});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual({
			success: false,
			errors: ["Não autorizado"],
			data: null,
		});

		const companyInDatabase = await prisma.company.findFirst({
			where: {
				cnpj: company.cnpj,
			},
		});

		expect(companyInDatabase).toBeFalsy();
	});

	it("should not be able to create a company with invalid data", async () => {
		const user = makeUser({
			role: Role.company(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.post("/company")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				cnpj: "invalid-cnpj",
				legalName: "",
				tradeName: "",
				address: "",
				email: "invalid-email",
				phone: "",
				site: "invalid-site",
				portfolioDescription: "",
			});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual({
			success: false,
			errors: expect.any(Array),
			data: null,
		});

		const companyInDatabase = await prisma.company.findFirst({
			where: {
				userId: user.id.toString(),
			},
		});

		expect(companyInDatabase).toBeFalsy();
	});
});

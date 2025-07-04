import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";

describe("Create Opportunity (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create an opportunity", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = makeType({
			description: "Test Type 1",
		});
		await prisma.type.create({
			data: {
				id: type.id.toString(),
				description: type.description,
				group: type.group.toPrisma(),
				parentId: type.parentId ?? null,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			},
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: opportunity.title,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
				requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
					name: doc.name,
					description: doc.description,
					model: doc.model,
				})),
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body.data).toEqual(null);
	});

	it("should not be able to create an opportunity with the same title", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = makeType({
			description: "Test Type 3",
		});
		await prisma.type.create({
			data: {
				id: type.id.toString(),
				description: type.description,
				group: type.group.toPrisma(),
				parentId: type.parentId ?? null,
				createdAt: type.createdAt,
				updatedAt: type.updatedAt,
			},
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		await prisma.opportunity.create({
			data: {
				title: "Primeira Oportunidade",
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
				requiredDocuments: {
					create: opportunity.requiredDocuments.map((doc, index) => ({
						name: `Documento ${index + 1}`,
						description: doc.description,
						model: doc.model,
					})),
				},
			},
		});

		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: "Primeira Oportunidade",
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
				requiredDocuments: opportunity.requiredDocuments.map((doc, index) => ({
					name: `Documento ${index + 1}`,
					description: doc.description,
					model: doc.model,
				})),
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Título já cadastrado"],
			data: null,
		});
	});
});

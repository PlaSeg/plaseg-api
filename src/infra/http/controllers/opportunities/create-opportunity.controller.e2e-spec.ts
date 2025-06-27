import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import { makeProjectType } from "../../../../../test/factories/make-project-type";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";
import { makeBaseProduct } from "../../../../../test/factories/make-base-product";

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
			group: TypeGroup.opportunity(),
		});

		const typeBaseProduct = makeType({
			description: "Test Type 2",
			group: TypeGroup.category(),
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

		await prisma.type.create({
			data: {
				id: typeBaseProduct.id.toString(),
				description: typeBaseProduct.description,
				group: typeBaseProduct.group.toPrisma(),
				parentId: typeBaseProduct.parentId ?? null,
				createdAt: typeBaseProduct.createdAt,
				updatedAt: typeBaseProduct.updatedAt,
			},
		});

		const projectType1 = makeProjectType({
			name: "Project Type 1",
		});

		const projectType2 = makeProjectType({
			name: "Project Type 2",
		});

		await prisma.projectType.createMany({
			data: [
				{
					id: projectType1.id.toString(),
					name: projectType1.name,
					createdAt: projectType1.createdAt,
					updatedAt: projectType1.updatedAt,
				},
				{
					id: projectType2.id.toString(),
					name: projectType2.name,
					createdAt: projectType2.createdAt,
					updatedAt: projectType2.updatedAt,
				},
			],
		});

		const baseProduct1 = makeBaseProduct({
			name: "Base Product 1",
			code: "Code 1"
		});

		const baseProduct2 = makeBaseProduct({
			name: "Base Product 2",
			code: "Code 2"
		});

		await prisma.baseProduct.createMany({
			data: [
				{
					id: baseProduct1.id.toString(),
					name: baseProduct1.name,
					budget1: baseProduct1.budget1,
					budget1Validity: baseProduct1.budget1Validity,
					budget2: baseProduct1.budget2,
					budget2Validity: baseProduct1.budget2Validity,
					budget3: baseProduct1.budget3,
					budget3Validity: baseProduct1.budget3Validity,
					code: baseProduct1.code,
					technicalDescription: baseProduct1.technicalDescription,
					typeId: typeBaseProduct.id.toString(),
					unitValue: baseProduct1.unitValue,
					createdAt: baseProduct1.createdAt,
					updatedAt: baseProduct1.updatedAt,
				},
				{
					id: baseProduct2.id.toString(),
					name: baseProduct2.name,
					budget1: baseProduct2.budget1,
					budget1Validity: baseProduct2.budget1Validity,
					budget2: baseProduct2.budget2,
					budget2Validity: baseProduct2.budget2Validity,
					budget3: baseProduct2.budget3,
					budget3Validity: baseProduct2.budget3Validity,
					code: baseProduct2.code,
					technicalDescription: baseProduct2.technicalDescription,
					typeId: typeBaseProduct.id.toString(),
					unitValue: baseProduct2.unitValue,
					createdAt: baseProduct2.createdAt,
					updatedAt: baseProduct2.updatedAt,
				},
			],
		});

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
			type: type.description,
		});

		const response = await request(app.server)
			.post("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: opportunity.title,
				description: opportunity.description,
				responsibleAgency: opportunity.responsibleAgency,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				type: opportunity.type,
				typeId: opportunity.typeId,
				projectTypeIds: [
					projectType1.id.toString(),
					projectType2.id.toString(),
				],
				baseProductIds: [
					baseProduct1.id.toString(),
					baseProduct2.id.toString()
				],
				requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
					name: doc.name,
					description: doc.description,
					model: doc.model,
				})),
				documents: [
					{
						name: "Document Example",
						fields: [
							{ id: "1", name: "Field 1", value: "Value 1" },
							{ id: "2", name: "Field 2", value: "Value 2", parentId: "1" },
						],
					},
				],
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
	});
});

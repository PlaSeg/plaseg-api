import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";
import { makeProjectType } from "../../../../../test/factories/make-project-type";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";

describe("Get Project Types By Opportunity ID (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get project types by opportunity id", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = makeType({
			description: "Test Type",
			group: TypeGroup.opportunity(),
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
			type: type.description,
		});

		await prisma.opportunity.create({
			data: {
				id: opportunity.id.toString(),
				title: opportunity.title,
				slug: opportunity.slug.value,
				description: opportunity.description,
				responsibleAgency: opportunity.responsibleAgency,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
				isActive: opportunity.isActive,
				createdAt: opportunity.createdAt,
				updatedAt: opportunity.updatedAt,
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

		await prisma.opportunityProjectType.create({
			data: {
				opportunityId: opportunity.id.toString(),
				projectTypeId: projectType1.id.toString(),
			},
		});

		const response = await request(app.server)
			.get(`/project-types/${opportunity.id.toString()}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: [
				expect.objectContaining({
					id: projectType1.id.toString(),
					name: projectType1.name,
				}),
			],
		});
	});
});

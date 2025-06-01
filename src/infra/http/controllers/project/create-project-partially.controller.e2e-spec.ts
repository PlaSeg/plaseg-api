import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import { prisma } from "../../../database/prisma/prisma";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";

describe("Create Project Partially (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a partial project", async () => {
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
				responsibleAgency: opportunity.responsibleAgency,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
			},
		});

		const projectType = await prisma.projectType.create({
			data: {
				name: "Test Project Type",
				documents: {
					create: [
						{
							name: "Test Document",
							fields: {
								create: [
									{
										id: "1",
										name: "Justificativa",
										value: "No Brasil...",
									},
									{
										id: "2",
										name: "Objetivos",
										value: "No Brasil...",
									},
								],
							},
						},
					],
				},
			},
		});

		const response = await request(app.server)
			.post("/projects")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: "Partial Project",
				opportunityId: opportunity.id.toString(),
				projectTypeId: projectType.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});
	});
});

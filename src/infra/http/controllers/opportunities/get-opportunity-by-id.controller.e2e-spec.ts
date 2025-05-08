import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";

describe("Get Opportunity By Id (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get an opportunity by id", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const opportunity = makeOpportunity();

		const createdOpportunity = await prisma.opportunity.create({
			data: {
				title: opportunity.title,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				requiredDocuments: {
					create: opportunity.requiredDocuments.map((doc) => ({
						name: doc.name,
						description: doc.description,
						model: doc.model,
					})),
				},
			},
			include: {
				requiredDocuments: true,
			},
		});

		const response = await request(app.server)
			.get(`/opportunities/${createdOpportunity.id}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.data).toEqual(
			expect.objectContaining({
				id: createdOpportunity.id,
				title: opportunity.title,
				description: opportunity.description,
			})
		);
	});

	it("should not be able to get an opportunity with non-existing id", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const response = await request(app.server)
			.get("/opportunities/6d3bc502-7e7d-40b5-a6c6-e58e9fc7924c")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: ["Oportunidade não encontrada"],
			data: null,
		});
	});
});

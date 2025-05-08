import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import request from "supertest";

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
			role: user.role,
		});

		const opportunity = makeOpportunity();

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
				requiredDocuments: [
					{
						name: opportunity.requiredDocuments[0].name,
						description: opportunity.requiredDocuments[0].description,
						model: opportunity.requiredDocuments[0].model,
					},
				],
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body.data).toEqual({
			id: expect.any(String),
			title: opportunity.title,
			description: opportunity.description,
			availableValue: opportunity.availableValue,
			minValue: opportunity.minValue,
			maxValue: opportunity.maxValue,
			initialDeadline: opportunity.initialDeadline.toISOString(),
			finalDeadline: opportunity.finalDeadline.toISOString(),
			requiresCounterpart: opportunity.requiresCounterpart,
			counterpartPercentage: opportunity.counterpartPercentage,
			createdAt: expect.any(String),
			updatedAt: null,
			requiredDocuments: [
				{
					id: expect.any(String),
					name: opportunity.requiredDocuments[0].name,
					description: opportunity.requiredDocuments[0].description,
					model: opportunity.requiredDocuments[0].model,
					createdAt: expect.any(String),
					updatedAt: null,
				},
			],
		});
	});

	it("should not be able to create an opportunity with the same title", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role,
		});

		const opportunity = makeOpportunity();

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
				requiredDocuments: [
					{
						name: opportunity.requiredDocuments[0].name,
						description: opportunity.requiredDocuments[0].description,
						model: opportunity.requiredDocuments[0].model,
					},
				],
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Título já cadastrado"],
			data: null,
		});
	});
});

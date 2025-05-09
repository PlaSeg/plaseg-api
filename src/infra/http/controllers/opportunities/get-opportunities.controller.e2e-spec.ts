import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";

describe("Get Opportunities (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get opportunities", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const opportunity = makeOpportunity();

		await prisma.opportunity.createMany({
			data: [
				{
					title: opportunity.title,
					description: opportunity.description,
					availableValue: opportunity.availableValue,
					minValue: opportunity.minValue,
					maxValue: opportunity.maxValue,
					initialDeadline: opportunity.initialDeadline,
					finalDeadline: opportunity.finalDeadline,
					requiresCounterpart: opportunity.requiresCounterpart,
					counterpartPercentage: opportunity.counterpartPercentage,
				},
			],
		});

		const response = await request(app.server)
			.get("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.data).toEqual([
			{
				id: expect.any(String),
				title: opportunity.title,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				initialDeadline: expect.any(String),
				finalDeadline: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: null,
				requiredDocuments: [],
			},
		]);
	});

	it("should return an empty array when there are no opportunities", async () => {
		await prisma.opportunity.deleteMany();

		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.get("/opportunities")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
	});
});

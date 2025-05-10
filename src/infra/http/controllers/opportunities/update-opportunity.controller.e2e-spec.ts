import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import { makeOpportunity } from "../../../../../test/factories/make-opportunity";
import { makeType } from "../../../../../test/factories/make-type";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";

describe("Update Opportunity (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to update an opportunity", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const type = makeType();
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
				typeId: opportunity.typeId,
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

		const updateData = {
			title: "Novo título",
			description: "Nova descrição",
			requiredDocuments: [
				{
					id: createdOpportunity.requiredDocuments[0].id,
					name: "Documento atualizado",
					description: "Descrição atualizada",
					model: "modelo-atualizado.pdf",
				},
			],
		};

		const response = await request(app.server)
			.put(`/opportunities/${createdOpportunity.id}`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send(updateData);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		// Verifica se a oportunidade foi atualizada no banco
		const updatedOpportunity = await prisma.opportunity.findUnique({
			where: {
				id: createdOpportunity.id,
			},
			include: {
				requiredDocuments: true,
			},
		});

		expect(updatedOpportunity).toEqual(
			expect.objectContaining({
				title: updateData.title,
				description: updateData.description,
				requiredDocuments: expect.arrayContaining([
					expect.objectContaining({
						name: updateData.requiredDocuments[0].name,
						description: updateData.requiredDocuments[0].description,
						model: updateData.requiredDocuments[0].model,
					}),
				]),
			})
		);
	});

	it("should not be able to update an opportunity with non-existing id", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		const response = await request(app.server)
			.put("/opportunities/6d3bc502-7e7d-40b5-a6c6-e58e9fc7924c")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: "Novo título",
			});

		expect(response.statusCode).toEqual(404);
		expect(response.body).toEqual({
			success: false,
			errors: ["Oportunidade não encontrada"],
			data: null,
		});
	});

	it("should not be able to update an opportunity with an existing title", async () => {
		const user = makeUser({
			role: Role.admin(),
		});

		const accessToken = app.jwt.sign({
			sub: user.id.toString(),
			role: user.role.toString(),
		});

		// Cria dois tipos
		const type1 = makeType({
			description: "Test Type 1",
		});
		const type2 = makeType({
			description: "Test Type 2",
		});

		await prisma.type.create({
			data: {
				id: type1.id.toString(),
				description: type1.description,
				group: type1.group.toPrisma(),
				parentId: type1.parentId ?? null,
				createdAt: type1.createdAt,
				updatedAt: type1.updatedAt,
			},
		});

		await prisma.type.create({
			data: {
				id: type2.id.toString(),
				description: type2.description,
				group: type2.group.toPrisma(),
				parentId: type2.parentId ?? null,
				createdAt: type2.createdAt,
				updatedAt: type2.updatedAt,
			},
		});

		// Cria duas oportunidades
		const opportunity1 = makeOpportunity({
			typeId: type1.id.toString(),
		});
		const opportunity2 = makeOpportunity({
			typeId: type2.id.toString(),
		});

		await prisma.opportunity.create({
			data: {
				title: opportunity1.title,
				description: opportunity1.description,
				availableValue: opportunity1.availableValue,
				minValue: opportunity1.minValue,
				maxValue: opportunity1.maxValue,
				initialDeadline: opportunity1.initialDeadline,
				finalDeadline: opportunity1.finalDeadline,
				requiresCounterpart: opportunity1.requiresCounterpart,
				counterpartPercentage: opportunity1.counterpartPercentage,
				typeId: opportunity1.typeId,
				requiredDocuments: {
					create: opportunity1.requiredDocuments.map((doc) => ({
						name: doc.name,
						description: doc.description,
						model: doc.model,
					})),
				},
			},
		});

		const createdOpportunity2 = await prisma.opportunity.create({
			data: {
				title: "teste2",
				description: opportunity2.description,
				availableValue: opportunity2.availableValue,
				minValue: opportunity2.minValue,
				maxValue: opportunity2.maxValue,
				initialDeadline: opportunity2.initialDeadline,
				finalDeadline: opportunity2.finalDeadline,
				requiresCounterpart: opportunity2.requiresCounterpart,
				counterpartPercentage: opportunity2.counterpartPercentage,
				typeId: opportunity2.typeId,
				requiredDocuments: {
					create: opportunity2.requiredDocuments.map((doc) => ({
						name: "teste2",
						description: doc.description,
						model: doc.model,
					})),
				},
			},
		});

		// Tenta atualizar a segunda oportunidade com o título da primeira
		const response = await request(app.server)
			.put(`/opportunities/${createdOpportunity2.id}`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: opportunity1.title,
			});

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual({
			success: false,
			errors: ["Título já cadastrado"],
			data: null,
		});
	});
});

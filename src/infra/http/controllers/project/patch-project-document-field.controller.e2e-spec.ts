import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { Role } from "../../../../domain/entities/value-objects/role";
import request from "supertest";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";
import { makeProject } from "../../../../../test/factories/make-project";
import { TypeGroup } from "@prisma/client";

describe("Patch Project Document Field (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to update project document field value", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678900",
			phone: "11999999999",
		});

		const accessToken = app.jwt.sign({
			sub: admin.id.toString(),
			role: admin.role.toString(),
		});

		const type = await prisma.type.create({
			data: {
				description: "Test Type",
				group: TypeGroup.OPPORTUNITY,
			},
		});

		const projectType = await prisma.projectType.create({
			data: {
				name: "Test Project Type",
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos do Tipo de Projeto",
									},
									{
										name: "Metodologia",
										value: "Metodologia do Tipo de Projeto",
									},
								],
							},
						},
					],
				},
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		const opportunity = await prisma.opportunity.create({
			data: {
				title: "Test Opportunity",
				slug: "test-opportunity",
				responsibleAgency: "Test Agency",
				description: "Test Description",
				availableValue: 10000,
				minValue: 1000,
				maxValue: 5000,
				initialDeadline: new Date(),
				finalDeadline: new Date(),
				requiresCounterpart: false,
				typeId: type.id,
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos da Oportunidade",
									},
									{
										name: "Metodologia",
										value: "Metodologia da Oportunidade",
									},
								],
							},
						},
					],
				},
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		const project = makeProject({
			title: "Test Project",
		});

		const createdProject = await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				projectTypeId: projectType.id,
				opportunityId: opportunity.id,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
				documents: {
					create: [
						{
							name: "Proposta Técnica",
							fields: {
								create: [
									{
										name: "Objetivos",
										value: "Objetivos do Projeto",
									},
									{
										name: "Metodologia",
										value: "Metodologia do Projeto",
									},
								],
							},
						},
					],
				},
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
			},
		});

		const fieldToUpdate = createdProject.documents[0].fields[0];

		const response = await request(app.server)
			.patch(`/projects/document-fields/${fieldToUpdate.id}`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				value: "Novos Objetivos do Projeto",
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const updatedField = await prisma.field.findUnique({
			where: {
				id: fieldToUpdate.id,
			},
		});

		expect(updatedField?.value).toBe("Novos Objetivos do Projeto");
	});
});

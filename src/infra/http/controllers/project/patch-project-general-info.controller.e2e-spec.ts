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

describe("Patch Project General Info (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to update project general info", async () => {
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

		// Criar Project Type com documentos que serão mesclados
		const projectType = await prisma.projectType.create({
			data: {
				name: "Test Project Type",
				documents: {
					create: [
						{
							name: "Documento Comum",
							fields: {
								create: [
									{
										name: "Campo Comum",
										value: "Valor do Tipo de Projeto",
									},
									{
										name: "Campo Específico do Tipo",
										value: "Valor Específico do Tipo",
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
							name: "Documento Comum",
							fields: {
								create: [
									{
										name: "Campo Comum",
										value: "Valor da Oportunidade",
									},
									{
										name: "Campo Específico da Oportunidade",
										value: "Valor Específico da Oportunidade",
									},
								],
							},
						},
						{
							name: "Documento Apenas da Oportunidade",
							fields: {
								create: [
									{
										name: "Campo Único",
										value: "Valor Único",
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
			responsibleName: "Old Name",
			responsibleEmail: "old@email.com",
		});

		await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				responsibleName: project.responsibleName,
				responsibleEmail: project.responsibleEmail,
				projectTypeId: projectType.id,
				opportunityId: opportunity.id,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
				documents: {
					create: project.documents.map((doc) => ({
						name: doc.name,
						fields: {
							create: doc.fields.map((field) => ({
								name: field.name,
								value: field.value,
								parentId: field.parentId?.toString(),
							})),
						},
					})),
				},
			},
		});

		const response = await request(app.server)
			.patch(`/projects/${project.id.toString()}/general-info`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				responsibleName: "New Name",
				responsibleEmail: "new@email.com",
				totalValue: 1000,
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const updatedProject = await prisma.project.findUnique({
			where: {
				id: project.id.toString(),
			},
		});

		expect(updatedProject?.responsibleName).toBe("New Name");
		expect(updatedProject?.responsibleEmail).toBe("new@email.com");
		expect(updatedProject?.totalValue?.toNumber()).toBe(1000);
	});
});

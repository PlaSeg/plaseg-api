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

describe("Create Project Requested Item (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a requested item for a project", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678900",
			phone: "11999999999",
		});

		await prisma.user.create({
			data: {
				id: admin.id.toString(),
				name: "Admin User",
				email: admin.email.toString(),
				document: admin.document,
				phone: admin.phone,
				password: "hashed-password",
				role: admin.role.toPrisma(),
				allowed: true,
			},
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
			},
		});

		const project = makeProject({
			title: "Test Project",
		});

		await prisma.project.create({
			data: {
				id: project.id.toString(),
				title: project.title,
				projectTypeId: projectType.id,
				opportunityId: opportunity.id,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
			},
		});

		const baseProduct = await prisma.baseProduct.create({
			data: {
				code: "TEST-001",
				name: "Test Base Product",
				technicalDescription: "Test Description",
				budget1: 100,
				budget1Validity: new Date(),
				budget2: 100,
				budget2Validity: new Date(),
				budget3: 100,
				budget3Validity: new Date(),
				unitValue: 100,
				typeId: type.id,
			},
		});

		const municipality = await prisma.municipality.create({
			data: {
				name: "Test Municipality",
				guardInitialDate: new Date(),
				guardCount: 10,
				trafficInitialDate: new Date(),
				trafficCount: 5,
				federativeUnit: "SP",
				unitType: "MUNICIPALITY",
				userId: admin.id.toString(),
			},
		});

		const allocationDepartment = await prisma.allocationDepartment.create({
			data: {
				description: "Test Department",
				address: "Test Address",
				municipalityId: municipality.id,
			},
		});

		const maintenanceContract = await prisma.maintenanceContract.create({
			data: {
				description: "Test Contract",
				attachment: "test-attachment",
				municipalityId: municipality.id,
			},
		});

		const response = await request(app.server)
			.post(`/projects/${project.id.toString()}/requested-item`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				quantity: 5,
				baseProductId: baseProduct.id,
				allocationDepartmentId: allocationDepartment.id,
				maintenanceContractId: maintenanceContract.id,
			});

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: null,
		});

		const createdRequestedItem = await prisma.requestedItem.findFirst({
			where: {
				projectId: project.id.toString(),
				baseProductId: baseProduct.id,
			},
		});

		expect(createdRequestedItem).toBeTruthy();
		expect(createdRequestedItem?.quantity.toNumber()).toBe(5);
		expect(createdRequestedItem?.allocationDepartmentId).toBe(
			allocationDepartment.id
		);
		expect(createdRequestedItem?.maintenanceContractId).toBe(
			maintenanceContract.id
		);
	});
});

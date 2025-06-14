import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { makeAllocationDepartment } from "../../../../../test/factories/make-allocation-department";

import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";

describe("Get Allocation Departments (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get allocation departments", async () => {
		// Criar o usuário (representante do município)
		const municipalityUser = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality@example.com"),
			document: "98765432100",
			phone: "11988888888",
		});

		const user = await prisma.user.create({
			data: {
				id: municipalityUser.id.toString(),
				name: municipalityUser.name,
				email: municipalityUser.email.toString(),
				document: municipalityUser.document,
				phone: municipalityUser.phone,
				password: municipalityUser.password,
				role: municipalityUser.role.toPrisma(),
				allowed: municipalityUser.allowed,
				createdAt: municipalityUser.createdAt,
				updatedAt: municipalityUser.updatedAt,
			},
		});

		const municipality = makeMunicipality({
			userId: user.id,
		});

		const createdMunicipality = await prisma.municipality.create({
			data: {
				id: municipality.id.toString(),
				name: municipality.name,
				guardInitialDate: municipality.guardInitialDate,
				guardCount: municipality.guardCount,
				trafficInitialDate: municipality.trafficInitialDate,
				trafficCount: municipality.trafficCount,
				federativeUnit: municipality.federativeUnit,
				unitType: municipality.unitType.toPrisma(),
				userId: municipality.userId,
				createdAt: municipality.createdAt,
				updatedAt: municipality.updatedAt,
			},
		});

		const allocationDepartment1 = makeAllocationDepartment({
			description: "Departamento de Segurança Pública",
			address: "Rua das Flores, 123 - Centro",
		});

		const allocationDepartment2 = makeAllocationDepartment({
			description: "Departamento de Trânsito",
			address: "Avenida Principal, 456 - Vila Nova",
		});

		await prisma.allocationDepartment.create({
			data: {
				id: allocationDepartment1.id.toString(),
				description: allocationDepartment1.description,
				address: allocationDepartment1.address,
				municipalityId: createdMunicipality.id,
				createdAt: allocationDepartment1.createdAt,
				updatedAt: allocationDepartment1.updatedAt,
			},
		});

		await prisma.allocationDepartment.create({
			data: {
				id: allocationDepartment2.id.toString(),
				description: allocationDepartment2.description,
				address: allocationDepartment2.address,
				municipalityId: createdMunicipality.id,
				createdAt: allocationDepartment2.createdAt,
				updatedAt: allocationDepartment2.updatedAt,
			},
		});

		const accessToken = app.jwt.sign({
			sub: municipalityUser.id.toString(),
			role: municipalityUser.role.toString(),
		});

		const response = await request(app.server)
			.get("/municipality/allocation-departments")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: expect.arrayContaining([
				expect.objectContaining({
					id: allocationDepartment1.id.toString(),
					description: allocationDepartment1.description,
					address: allocationDepartment1.address,
				}),
				expect.objectContaining({
					id: allocationDepartment2.id.toString(),
					description: allocationDepartment2.description,
					address: allocationDepartment2.address,
				}),
			]),
		});
		expect(response.body.data).toHaveLength(2);
	});
});

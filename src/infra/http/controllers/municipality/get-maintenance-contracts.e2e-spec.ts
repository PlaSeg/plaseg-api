import fastify, { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { buildApp } from "../../app";
import { makeUser } from "../../../../../test/factories/make-user";
import { makeMunicipality } from "../../../../../test/factories/make-municipality";
import { makeMaintenanceContract } from "../../../../../test/factories/make-maintenance-contract";

import { Role } from "../../../../domain/entities/value-objects/role";
import { prisma } from "../../../database/prisma/prisma";
import { Email } from "../../../../domain/entities/value-objects/email";

describe("Get Maintenance Contracts (e2e)", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		app = fastify();
		buildApp(app);
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to get maintenance contracts", async () => {
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

		const maintenanceContract1 = makeMaintenanceContract({
			description: "Contrato de Manutenção de Equipamentos",
			attachment: "contrato-equipamentos.pdf",
		});

		const maintenanceContract2 = makeMaintenanceContract({
			description: "Contrato de Manutenção de Veículos",
			attachment: "contrato-veiculos.pdf",
		});

		await prisma.maintenanceContract.create({
			data: {
				id: maintenanceContract1.id.toString(),
				description: maintenanceContract1.description,
				attachment: maintenanceContract1.attachment,
				municipalityId: createdMunicipality.id,
				createdAt: maintenanceContract1.createdAt,
				updatedAt: maintenanceContract1.updatedAt,
			},
		});

		await prisma.maintenanceContract.create({
			data: {
				id: maintenanceContract2.id.toString(),
				description: maintenanceContract2.description,
				attachment: maintenanceContract2.attachment,
				municipalityId: createdMunicipality.id,
				createdAt: maintenanceContract2.createdAt,
				updatedAt: maintenanceContract2.updatedAt,
			},
		});

		const accessToken = app.jwt.sign({
			sub: municipalityUser.id.toString(),
			role: municipalityUser.role.toString(),
		});

		const response = await request(app.server)
			.get("/municipality/maintenance-contracts")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			success: true,
			errors: null,
			data: expect.arrayContaining([
				expect.objectContaining({
					id: maintenanceContract1.id.toString(),
					description: maintenanceContract1.description,
					attachment: maintenanceContract1.attachment,
				}),
				expect.objectContaining({
					id: maintenanceContract2.id.toString(),
					description: maintenanceContract2.description,
					attachment: maintenanceContract2.attachment,
				}),
			]),
		});
		expect(response.body.data).toHaveLength(2);
	});
});

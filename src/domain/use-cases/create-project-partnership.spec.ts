import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProjectPartnershipsRepository } from "../../../test/repositories/in-memory-project-partnerships-repository";
import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateProjectPartnershipUseCase } from "./create-project-partnership";

import { makeMunicipality } from "../../../test/factories/make-municipality";
import { makeProjectPartnership } from "../../../test/factories/make-project-partnership";

let inMemoryProjectPartnershipsRepository: InMemoryProjectPartnershipsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateProjectPartnershipUseCase;

describe("Create Project Partnership Use Case", () => {
	beforeEach(() => {
		inMemoryProjectPartnershipsRepository =
			new InMemoryProjectPartnershipsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateProjectPartnershipUseCase(
			inMemoryProjectPartnershipsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a new project partnership", async () => {
		const municipality = makeMunicipality();
		const projectPartnership = makeProjectPartnership();

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({
			term: projectPartnership.term,
			agency: projectPartnership.agency,
			objective: projectPartnership.objective,
			status: projectPartnership.status,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryProjectPartnershipsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a project partnership with existing term", async () => {
		const municipality = makeMunicipality();
		const existingProjectPartnership = makeProjectPartnership({
			term: "Term 1",
		});
		const newProjectPartnership = makeProjectPartnership({
			term: "Term 1",
		});

		await inMemoryMunicipalitiesRepository.create(municipality);
		await inMemoryProjectPartnershipsRepository.create(
			existingProjectPartnership
		);

		const result = await sut.execute({
			term: newProjectPartnership.term,
			agency: newProjectPartnership.agency,
			objective: newProjectPartnership.objective,
			status: newProjectPartnership.status,
			userId: municipality.userId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Parceria com esse termo já cadastrada!"
			);
		}
		expect(inMemoryProjectPartnershipsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a project partnership without municipality", async () => {
		const projectPartnership = makeProjectPartnership();

		const result = await sut.execute({
			term: projectPartnership.term,
			agency: projectPartnership.agency,
			objective: projectPartnership.objective,
			status: projectPartnership.status,
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual(
				"Cadastre um município antes de cadastrar uma parceria de projeto!"
			);
		}
		expect(inMemoryProjectPartnershipsRepository.items).toHaveLength(0);
	});
});

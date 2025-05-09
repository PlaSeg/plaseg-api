import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryQualifiedStaffsRepository } from "../../../test/repositories/in-memory-qualified-staffs-repository";
import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateQualifiedStaffUseCase } from "./create-qualified-staff";
import { makeMunicipality } from "../../../test/factories/make-municipality";
import { makeQualifiedStaff } from "../../../test/factories/make-qualified-staff";

let inMemoryQualifiedStaffsRepository: InMemoryQualifiedStaffsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateQualifiedStaffUseCase;

describe("Create Qualified Staff Use Case", () => {
	beforeEach(() => {
		inMemoryQualifiedStaffsRepository = new InMemoryQualifiedStaffsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateQualifiedStaffUseCase(
			inMemoryQualifiedStaffsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a new qualified staff", async () => {
		const municipality = makeMunicipality();
		const qualifiedStaff = makeQualifiedStaff();

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({
			name: qualifiedStaff.name,
			sector: qualifiedStaff.sector,
			education: qualifiedStaff.education,
			experience: qualifiedStaff.experience,
			employmentType: qualifiedStaff.employmentType.toString(),
			document: qualifiedStaff.document,
			isResponsible: qualifiedStaff.isResponsible,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryQualifiedStaffsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a qualified staff with existing document", async () => {
		const municipality = makeMunicipality();
		const existingQualifiedStaff = makeQualifiedStaff({
			document: "12345678900",
		});
		const newQualifiedStaff = makeQualifiedStaff({
			document: "12345678900",
		});

		await inMemoryMunicipalitiesRepository.create(municipality);
		await inMemoryQualifiedStaffsRepository.create(existingQualifiedStaff);

		const result = await sut.execute({
			name: newQualifiedStaff.name,
			sector: newQualifiedStaff.sector,
			education: newQualifiedStaff.education,
			experience: newQualifiedStaff.experience,
			employmentType: newQualifiedStaff.employmentType.toString(),
			document: newQualifiedStaff.document,
			isResponsible: newQualifiedStaff.isResponsible,
			userId: municipality.userId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Gestão qualificada já cadastrada!");
		}
		expect(inMemoryQualifiedStaffsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a qualified staff without municipality", async () => {
		const qualifiedStaff = makeQualifiedStaff();

		const result = await sut.execute({
			name: qualifiedStaff.name,
			sector: qualifiedStaff.sector,
			education: qualifiedStaff.education,
			experience: qualifiedStaff.experience,
			employmentType: qualifiedStaff.employmentType.toString(),
			document: qualifiedStaff.document,
			isResponsible: qualifiedStaff.isResponsible,
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual(
				"Cadastre um município antes de cadastrar uma gestão qualificada!"
			);
		}
		expect(inMemoryQualifiedStaffsRepository.items).toHaveLength(0);
	});
});

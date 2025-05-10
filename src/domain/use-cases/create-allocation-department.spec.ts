import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryAllocationDepartmentsRepository } from "../../../test/repositories/in-memory-allocation-departments-repository";
import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateAllocationDepartmentUseCase } from "./create-allocation-department";
import { makeMunicipality } from "../../../test/factories/make-municipality";
import { makeAllocationDepartment } from "../../../test/factories/make-allocation-department";

let inMemoryAllocationDepartmentsRepository: InMemoryAllocationDepartmentsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateAllocationDepartmentUseCase;

describe("Create Allocation Department Use Case", () => {
	beforeEach(() => {
		inMemoryAllocationDepartmentsRepository =
			new InMemoryAllocationDepartmentsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateAllocationDepartmentUseCase(
			inMemoryAllocationDepartmentsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a new allocation department", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const allocationDepartmentData = makeAllocationDepartment({
			municipalityId: municipality.id.toString(),
		});

		const result = await sut.execute({
			description: allocationDepartmentData.description,
			address: allocationDepartmentData.address,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryAllocationDepartmentsRepository.items).toHaveLength(1);
		expect(inMemoryAllocationDepartmentsRepository.items[0].description).toBe(
			allocationDepartmentData.description
		);
		expect(inMemoryAllocationDepartmentsRepository.items[0].address).toBe(
			allocationDepartmentData.address
		);
		expect(
			inMemoryAllocationDepartmentsRepository.items[0].municipalityId
		).toBe(municipality.id.toString());
	});

	it("should not be able to create an allocation department without municipality", async () => {
		const allocationDepartmentData = makeAllocationDepartment();

		const result = await sut.execute({
			description: allocationDepartmentData.description,
			address: allocationDepartmentData.address,
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual(
				"Cadastre um município antes de cadastrar um setor de alocação!"
			);
		}
		expect(inMemoryAllocationDepartmentsRepository.items).toHaveLength(0);
	});

	it("should not be able to create an allocation department with same description", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const allocationDepartmentData = makeAllocationDepartment({
			municipalityId: municipality.id.toString(),
		});

		await sut.execute({
			description: allocationDepartmentData.description,
			address: allocationDepartmentData.address,
			userId: municipality.userId.toString(),
		});

		const result = await sut.execute({
			description: allocationDepartmentData.description,
			address: "Another Address",
			userId: municipality.userId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Departamento já cadastrado.");
		}
		expect(inMemoryAllocationDepartmentsRepository.items).toHaveLength(1);
	});
});

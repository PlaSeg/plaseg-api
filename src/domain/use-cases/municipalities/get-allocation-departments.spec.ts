import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMunicipalitiesRepository } from "../../../../test/repositories/in-memory-municipalities-repository";
import { GetAllocationDepartmentsUseCase } from "./get-allocation-departments";
import { makeMunicipality } from "../../../../test/factories/make-municipality";
import { makeAllocationDepartment } from "../../../../test/factories/make-allocation-department";

let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: GetAllocationDepartmentsUseCase;

describe("Get Allocation Departments Use Case", () => {
	beforeEach(() => {
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new GetAllocationDepartmentsUseCase(inMemoryMunicipalitiesRepository);
	});

	it("should be able to get all allocation departments from a municipality", async () => {
		const allocationDepartment1 = makeAllocationDepartment();
		const allocationDepartment2 = makeAllocationDepartment();

		const municipality = makeMunicipality({
			userId: "user-123",
			allocationDepartments: [allocationDepartment1, allocationDepartment2],
		});

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({ userId: "user-123" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.allocationDepartments).toHaveLength(2);
			expect(result.value.allocationDepartments).toEqual([
				allocationDepartment1,
				allocationDepartment2,
			]);
		}
	});

	it("should return empty array when municipality has no allocation departments", async () => {
		const municipality = makeMunicipality({
			userId: "user-123",
			allocationDepartments: [],
		});

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({ userId: "user-123" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.allocationDepartments).toHaveLength(0);
			expect(result.value.allocationDepartments).toEqual([]);
		}
	});

	it("should return error when user does not have a municipality", async () => {
		const result = await sut.execute({ userId: "non-existent-user" });

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.message).toBe(
				"É necessário ter um município cadastrado."
			);
			expect(result.value.statusCode).toBe(400);
		}
	});

	it("should return error when userId is not provided", async () => {
		const result = await sut.execute({ userId: "" });

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.message).toBe(
				"É necessário ter um município cadastrado."
			);
			expect(result.value.statusCode).toBe(400);
		}
	});
});

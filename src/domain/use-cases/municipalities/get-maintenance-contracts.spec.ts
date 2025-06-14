import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMunicipalitiesRepository } from "../../../../test/repositories/in-memory-municipalities-repository";
import { GetMaintenanceContractsUseCase } from "./get-maintenance-contracts";
import { makeMunicipality } from "../../../../test/factories/make-municipality";
import { makeMaintenanceContract } from "../../../../test/factories/make-maintenance-contract";

let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: GetMaintenanceContractsUseCase;

describe("Get Maintenance Contracts Use Case", () => {
	beforeEach(() => {
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new GetMaintenanceContractsUseCase(inMemoryMunicipalitiesRepository);
	});

	it("should be able to get all maintenance contracts from a municipality", async () => {
		const maintenanceContract1 = makeMaintenanceContract();
		const maintenanceContract2 = makeMaintenanceContract();

		const municipality = makeMunicipality({
			userId: "user-123",
			maintenanceContracts: [maintenanceContract1, maintenanceContract2],
		});

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({ userId: "user-123" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.maintenanceContracts).toHaveLength(2);
			expect(result.value.maintenanceContracts).toEqual([
				maintenanceContract1,
				maintenanceContract2,
			]);
		}
	});

	it("should return empty array when municipality has no maintenance contracts", async () => {
		const municipality = makeMunicipality({
			userId: "user-123",
			maintenanceContracts: [],
		});

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({ userId: "user-123" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.maintenanceContracts).toHaveLength(0);
			expect(result.value.maintenanceContracts).toEqual([]);
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

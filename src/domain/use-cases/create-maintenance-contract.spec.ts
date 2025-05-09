import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryMaintenanceContractsRepository } from "../../../test/repositories/in-memory-maintenance-contracts-repository";
import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateMaintenanceContractUseCase } from "./create-maintenance-contract";
import { makeMaintenanceContract } from "../../../test/factories/make-maintenance-contract";
import { makeMunicipality } from "../../../test/factories/make-municipality";

let inMemoryMaintenanceContractsRepository: InMemoryMaintenanceContractsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateMaintenanceContractUseCase;

describe("Create Maintenance Contract Use Case", () => {
	beforeEach(() => {
		inMemoryMaintenanceContractsRepository =
			new InMemoryMaintenanceContractsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateMaintenanceContractUseCase(
			inMemoryMaintenanceContractsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a new maintenance contract", async () => {
		const municipality = makeMunicipality();
		const maintenanceContract = makeMaintenanceContract();

		await inMemoryMunicipalitiesRepository.create(municipality);

		const result = await sut.execute({
			description: maintenanceContract.description,
			attachment: maintenanceContract.attachment,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryMaintenanceContractsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a maintenance contract without municipality", async () => {
		const maintenanceContract = makeMaintenanceContract();

		const result = await sut.execute({
			description: maintenanceContract.description,
			attachment: maintenanceContract.attachment,
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual(
				"Cadastre um município antes de cadastrar um contrato de manutenção!"
			);
		}
		expect(inMemoryMaintenanceContractsRepository.items).toHaveLength(0);
	});
});

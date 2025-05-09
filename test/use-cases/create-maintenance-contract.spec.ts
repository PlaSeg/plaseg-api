import { InMemoryMaintenanceContractsRepository } from "../repositories/in-memory-maintenance-contracts-repository";
import { InMemoryMunicipalitiesRepository } from "../repositories/in-memory-municipalities-repository";
import { CreateMaintenanceContractUseCase } from "../../src/domain/use-cases/create-maintenance-contract";
import { makeMaintenanceContract } from "../factories/make-maintenance-contract";
import { makeMunicipality } from "../factories/make-municipality";

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

	it("should be able to create a maintenance contract", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const maintenanceContract = makeMaintenanceContract();

		const result = await sut.execute({
			description: maintenanceContract.description,
			attachment: maintenanceContract.attachment,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryMaintenanceContractsRepository.items[0]).toEqual(
			expect.objectContaining({
				description: maintenanceContract.description,
				attachment: maintenanceContract.attachment,
			})
		);
	});
});

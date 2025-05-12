import { CreateManagementUseCase } from "../../../../domain/use-cases/create-management";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";
import { PrismaManagementsRepository } from "../repositories/prisma-managements-repository";

export function makeCreateManagementUseCase() {
	const managementRepository = new PrismaManagementsRepository();
	const municipalityRepository = new PrismaMunicipalityRepository();
	const useCase = new CreateManagementUseCase(
		managementRepository,
		municipalityRepository
	);

	return useCase;
}

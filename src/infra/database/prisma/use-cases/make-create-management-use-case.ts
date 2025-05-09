import { CreateManagementUseCase } from "../../../../domain/use-cases/create-management";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";
import { PrismaManagementRepository } from "../repositories/prisma-management-repository";

export function makeCreateManagementUseCase() {
	const managementRepository = new PrismaManagementRepository();
	const municipalityRepository = new PrismaMunicipalityRepository();

	const useCase = new CreateManagementUseCase(
		managementRepository,
		municipalityRepository
	);

	return useCase;
}

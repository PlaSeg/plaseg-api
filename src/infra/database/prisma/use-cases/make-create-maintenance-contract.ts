import { PrismaMaintenanceContractRepository } from "../repositories/prisma-maintenance-contract-repository";
import { CreateMaintenanceContractUseCase } from "../../../../domain/use-cases/create-maintenance-contract";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeCreateMaintenanceContractUseCase() {
	const maintenanceContractsRepository =
		new PrismaMaintenanceContractRepository();
	const municipalitiesRepository = new PrismaMunicipalityRepository();
	const usecase = new CreateMaintenanceContractUseCase(
		maintenanceContractsRepository,
		municipalitiesRepository
	);

	return usecase;
}

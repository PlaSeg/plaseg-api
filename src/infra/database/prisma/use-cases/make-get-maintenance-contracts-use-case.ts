import { GetMaintenanceContractsUseCase } from "../../../../domain/use-cases/municipalities/get-maintenance-contracts";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeGetMaintenanceContractsUseCase() {
	const municipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new GetMaintenanceContractsUseCase(municipalitiesRepository);

	return useCase;
}

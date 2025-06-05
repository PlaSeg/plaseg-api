import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { GetProjectTypesByOpportunityIdUseCase } from "../../../../domain/use-cases/project-types/get-project-type-by-opportunity-id";

export function makeGetProjectTypesByOpportunityIdUseCase() {
	const projectTypesRepository = new PrismaProjectTypesRepository();
	const useCase = new GetProjectTypesByOpportunityIdUseCase(
		projectTypesRepository
	);

	return useCase;
}

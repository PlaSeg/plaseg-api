import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { CreateOpportunityUseCase } from "../../../../domain/use-cases/opportunities/create-opportunity";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();
	const projectTypesRepository = new PrismaProjectTypesRepository();

	const useCase = new CreateOpportunityUseCase(
		opportunitiesRepository,
		typesRepository,
		projectTypesRepository
	);

	return useCase;
}

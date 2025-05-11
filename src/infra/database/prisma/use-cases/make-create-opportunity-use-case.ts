import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { CreateOpportunityUseCase } from "../../../../domain/use-cases/create-opportunity";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypeRepository();

	const useCase = new CreateOpportunityUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}

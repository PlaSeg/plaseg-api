import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunityByIdUseCase } from "../../../../domain/use-cases/get-opportunity-by-id";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeGetOpportunityByIdUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();

	const useCase = new GetOpportunityByIdUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}

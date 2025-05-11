import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunityByIdUseCase } from "../../../../domain/use-cases/get-opportunity-by-id";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";

export function makeGetOpportunityByIdUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypeRepository();

	const useCase = new GetOpportunityByIdUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}

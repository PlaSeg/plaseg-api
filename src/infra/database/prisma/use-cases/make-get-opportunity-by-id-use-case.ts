import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunityByIdUseCase } from "../../../../domain/use-cases/get-opportunity-by-id";

export function makeGetOpportunityByIdUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();

	const useCase = new GetOpportunityByIdUseCase(opportunitiesRepository);

	return useCase;
}

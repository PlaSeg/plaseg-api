import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { CreateOpportunityUseCase } from "../../../../domain/use-cases/create-opportunity";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();

	const useCase = new CreateOpportunityUseCase(opportunitiesRepository);

	return useCase;
}

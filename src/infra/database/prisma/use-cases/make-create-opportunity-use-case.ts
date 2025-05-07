import { CreateOpportunityUseCase } from "../../../../domain/use-cases/create-opportunity";
import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";

export function makeCreateOpportunityUseCase() {
	const OpportunitiesRepository = new PrismaOpportunitiesRepository();
	const useCase = new CreateOpportunityUseCase(OpportunitiesRepository);

	return useCase;
}

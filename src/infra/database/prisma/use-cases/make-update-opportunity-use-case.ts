import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { UpdateOpportunityUseCase } from "../../../../domain/use-cases/update-opportunity";

export function makeUpdateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const updateOpportunityUseCase = new UpdateOpportunityUseCase(
		opportunitiesRepository
	);

	return updateOpportunityUseCase;
}

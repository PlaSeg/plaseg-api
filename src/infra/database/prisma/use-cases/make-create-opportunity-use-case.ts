import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { CreateOpportunityUseCase } from "../../../../domain/use-cases/opportunities/create-opportunity";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";

export function makeCreateOpportunityUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();
	const projectTypesRepository = new PrismaProjectTypesRepository();
	const baseProductsRepository = new PrismaBaseProductsRepository();

	const useCase = new CreateOpportunityUseCase(
		opportunitiesRepository,
		typesRepository,
		projectTypesRepository,
		baseProductsRepository
	);

	return useCase;
}

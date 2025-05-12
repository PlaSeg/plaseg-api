import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunitiesUseCase } from "../../../../domain/use-cases/get-opportunities";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeGetOpportunitiesUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypesRepository();

	const useCase = new GetOpportunitiesUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}

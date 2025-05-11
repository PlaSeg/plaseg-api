import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { GetOpportunitiesUseCase } from "../../../../domain/use-cases/get-opportunities";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";

export function makeGetOpportunitiesUseCase() {
	const opportunitiesRepository = new PrismaOpportunitiesRepository();
	const typesRepository = new PrismaTypeRepository();

	const useCase = new GetOpportunitiesUseCase(
		opportunitiesRepository,
		typesRepository
	);

	return useCase;
}

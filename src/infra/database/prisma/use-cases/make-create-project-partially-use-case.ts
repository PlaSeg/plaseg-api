import { CreateProjectPartiallyUseCase } from "../../../../domain/use-cases/project/create-project-partially";
import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeCreateProjectPartiallyUseCase() {
	const ProjectsRepository = new PrismaProjectsRepository();
	const OpportunitiesRepository = new PrismaOpportunitiesRepository();
	const ProjectTypesRepository = new PrismaProjectTypesRepository();
	const MunicipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new CreateProjectPartiallyUseCase(
		ProjectsRepository,
		OpportunitiesRepository,
		ProjectTypesRepository,
		MunicipalitiesRepository
	);

	return useCase;
}

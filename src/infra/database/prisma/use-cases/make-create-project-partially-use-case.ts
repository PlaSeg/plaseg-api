import { CreateProjectPartiallyUseCase } from "../../../../domain/use-cases/project/create-project-partially";
import { PrismaOpportunitiesRepository } from "../repositories/prisma-opportunities-repository";
import { PrismaProjectsRepository } from "../repositories/prisma-project-repository";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";

export function makeCreateProjectPartiallyUseCase() {
    const ProjectsRepository = new PrismaProjectsRepository();
    const OpportunitiesRepository = new PrismaOpportunitiesRepository();
    const ProjectTypesRepository = new PrismaProjectTypesRepository();

    const useCase = new CreateProjectPartiallyUseCase(ProjectsRepository, OpportunitiesRepository, ProjectTypesRepository);

    return useCase;
}
import { PrismaProjectsRepository } from "../repositories/prisma-projects-repository";
import { GetProjectsUseCase } from "../../../../domain/use-cases/project/get-projects";

export function makeGetProjectsUseCase() {
    const ProjectRepository = new PrismaProjectsRepository();

    const useCase = new GetProjectsUseCase(ProjectRepository);

    return useCase;
}

import { CreateProjectTypeUseCase } from "../../../../domain/use-cases/project-types/create-project-type";
import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";

export function makeCreateProjectTypeUseCase() {
    const ProjectTypesRepository = new PrismaProjectTypesRepository();
    const useCase = new CreateProjectTypeUseCase(ProjectTypesRepository);

    return useCase;
}

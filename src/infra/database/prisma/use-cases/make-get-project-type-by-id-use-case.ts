import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { GetProjectTypeByIdUseCase } from "../../../../domain/use-cases/project-types/get-project-type-by-id";

export function makeGetProjectTypeByIdUseCase() {
    const ProjectTypesRepository = new PrismaProjectTypesRepository();

    const useCase = new GetProjectTypeByIdUseCase(ProjectTypesRepository);

    return useCase;
}

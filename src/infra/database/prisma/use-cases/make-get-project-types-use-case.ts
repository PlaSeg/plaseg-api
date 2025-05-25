import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { GetProjectTypesUseCase } from "../../../../domain/use-cases/project-types/get-project-types";

export function makeGetProjectTypesUseCase() {
    const ProjectTypesRepository = new PrismaProjectTypesRepository();

    const useCase = new GetProjectTypesUseCase(ProjectTypesRepository);

    return useCase;
}

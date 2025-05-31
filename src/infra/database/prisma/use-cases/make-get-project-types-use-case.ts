import { PrismaProjectTypesRepository } from "../repositories/prisma-project-type-repository";
import { GetProjectTypesUseCase } from "../../../../domain/use-cases/project-types/get-project-types";

export function makeGetProjectTypesUseCase() {
    const projectTypesRepository = new PrismaProjectTypesRepository();

    const useCase = new GetProjectTypesUseCase(projectTypesRepository);

    return useCase;
}

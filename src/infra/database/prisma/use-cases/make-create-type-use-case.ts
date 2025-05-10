import { PrismaTypeRepository } from "../repositories/prisma-type-repository";
import { CreateTypeUseCase } from "../../../../domain/use-cases/create-type";

export function makeCreateTypeUseCase() {
    const typesRepository = new PrismaTypeRepository();

    const useCase = new CreateTypeUseCase(typesRepository);

    return useCase;
}

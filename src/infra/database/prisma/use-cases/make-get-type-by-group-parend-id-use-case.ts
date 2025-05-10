import { PrismaTypeRepository } from "../repositories/prisma-type-repository";
import { GetTypesByGroupParentIdUseCase } from "../../../../domain/use-cases/get-type-by-group-parent-id";

export function makeGetTypeByGroupParentIdUseCase() {
    const TypesRepository = new PrismaTypeRepository();

    const useCase = new GetTypesByGroupParentIdUseCase(TypesRepository);

    return useCase;
}

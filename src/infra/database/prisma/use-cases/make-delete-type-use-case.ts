import { PrismaTypeRepository } from "../repositories/prisma-type-repository";
import { DeleteTypeUseCase } from "../../../../domain/use-cases/types/delete-type";

export function makeDeleteTypeUseCase() {
	const typesRepository = new PrismaTypeRepository();

	const useCase = new DeleteTypeUseCase(typesRepository);

	return useCase;
}

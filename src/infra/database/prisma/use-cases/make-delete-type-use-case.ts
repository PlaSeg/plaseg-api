import { PrismaTypesRepository } from "../repositories/prisma-types-repository";
import { DeleteTypeUseCase } from "../../../../domain/use-cases/types/delete-type";

export function makeDeleteTypeUseCase() {
	const typesRepository = new PrismaTypesRepository();

	const useCase = new DeleteTypeUseCase(typesRepository);

	return useCase;
}

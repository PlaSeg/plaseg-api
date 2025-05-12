import { PrismaTypeRepository } from "../repositories/prisma-type-repository";
import { GetTypesUseCase } from "../../../../domain/use-cases/types/get-types";

export function makeGetTypesUseCase() {
	const TypesRepository = new PrismaTypeRepository();

	const useCase = new GetTypesUseCase(TypesRepository);

	return useCase;
}

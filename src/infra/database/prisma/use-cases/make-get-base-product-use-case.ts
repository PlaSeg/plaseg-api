import { GetBaseProductUseCase } from "../../../../domain/use-cases/base-products/get-base-product";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeGetBaseProductUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const typeRepository = new PrismaTypesRepository();

	const usecase = new GetBaseProductUseCase(
		baseProductsRepository,
		typeRepository
	);

	return usecase;
}

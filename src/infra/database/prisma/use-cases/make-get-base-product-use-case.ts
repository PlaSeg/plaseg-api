import { GetBaseProductUseCase } from "../../../../domain/use-cases/get-base-product";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";

export function makeGetBaseProductUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const typeRepository = new PrismaTypeRepository();
	const getBaseProductUseCase = new GetBaseProductUseCase(
		baseProductsRepository,
		typeRepository
	);

	return getBaseProductUseCase;
}

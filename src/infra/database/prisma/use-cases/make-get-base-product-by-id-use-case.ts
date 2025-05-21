import { GetBaseProductByIdUseCase } from "../../../../domain/use-cases/base-products/get-base-product-by-id";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypesRepository } from "../repositories/prisma-types-repository";

export function makeGetBaseProductByIdUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const typeRepository = new PrismaTypesRepository();
	const getBaseProductByIdUseCase = new GetBaseProductByIdUseCase(
		baseProductsRepository,
		typeRepository
	);

	return getBaseProductByIdUseCase;
}

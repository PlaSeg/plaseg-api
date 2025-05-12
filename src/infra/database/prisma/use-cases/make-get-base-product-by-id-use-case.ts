import { GetBaseProductByIdUseCase } from "../../../../domain/use-cases/get-base-product-by-id";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";


export function makeGetBaseProductByIdUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const typeRepository = new PrismaTypeRepository();
	const getBaseProductByIdUseCase = new GetBaseProductByIdUseCase(
		baseProductsRepository,
		typeRepository
	);

	return getBaseProductByIdUseCase;
}

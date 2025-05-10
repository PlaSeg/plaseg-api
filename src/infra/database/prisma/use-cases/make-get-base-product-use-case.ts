import { GetBaseProductUseCase } from "../../../../domain/use-cases/get-base-product";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";

export function makeGetBaseProductUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const getBaseProductUseCase = new GetBaseProductUseCase(
		baseProductsRepository
	);

	return getBaseProductUseCase;
}

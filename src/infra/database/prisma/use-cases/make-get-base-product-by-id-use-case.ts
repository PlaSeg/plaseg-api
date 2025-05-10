import { GetBaseProductByIdUseCase } from "../../../../domain/use-cases/get-base-product-by-id";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";


export function makeGetBaseProductByIdUseCase() {
	const baseProductsRepository = new PrismaBaseProductsRepository();
	const getBaseProductByIdUseCase = new GetBaseProductByIdUseCase(
		baseProductsRepository
	);

	return getBaseProductByIdUseCase;
}

import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { CreateBaseProductUseCase } from "../../../../domain/use-cases/create-base-product";
import { PrismaTypeRepository } from "../repositories/prisma-type-repository";

export function makeCreateBaseProductUseCase() {
    const baseProductsRepository = new PrismaBaseProductsRepository();
    const typesRepository = new PrismaTypeRepository();

    return new CreateBaseProductUseCase(
			baseProductsRepository,
			typesRepository
		);
}

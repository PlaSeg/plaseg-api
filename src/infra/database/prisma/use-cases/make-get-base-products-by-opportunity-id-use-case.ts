import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { GetBaseProductsByOpportunityIdUseCase } from "../../../../domain/use-cases/base-products/get-base-products-by-opportunity-id";

export function makeGetBaseProductsByOpportunityIdUseCase() {
    const baseProductsRepository = new PrismaBaseProductsRepository();
    const useCase = new GetBaseProductsByOpportunityIdUseCase(
        baseProductsRepository
    );

    return useCase;
}

import { GetSpecificProductUseCase } from "../../../../domain/use-cases/products/get-specific-products";
import { PrismaCompanyRepository } from "../repositories/prisma-company-repository";
import { PrismaSpecificProductsRepository } from "../repositories/prisma-specific-product-repository";

export function makeGetSpecificProductUseCase() {
    const SpecificProductRepository = new PrismaSpecificProductsRepository();
    const CompanyRepository = new PrismaCompanyRepository();

    const useCase = new GetSpecificProductUseCase(SpecificProductRepository, CompanyRepository);

    return useCase;
}

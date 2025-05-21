import { PrismaSpecificProductsRepository } from "../repositories/prisma-specific-product-repository";
import { CreateSpecificProductUseCase } from "../../../../domain/use-cases/specific-products/create-specific-product";
import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { PrismaCompanyRepository } from "../repositories/prisma-company-repository";

export function makeCreateSpecificProductUseCase() {
	const specificProductRepository = new PrismaSpecificProductsRepository();
	const baseProductRepository = new PrismaBaseProductsRepository();
	const companyRepository = new PrismaCompanyRepository();

	const useCase = new CreateSpecificProductUseCase(
		specificProductRepository,
		baseProductRepository,
		companyRepository
	);

	return useCase;
}

import { CreateSpecificProductUseCase } from "./create-specific-product";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";
import { makeCompany } from "../../../../test/factories/make-company";
import { CustomError } from "../../../core/errors/custom-error";
import { InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";

let specificProductsRepository: InMemorySpecificProductsRepository;
let baseProductsRepository: InMemoryBaseProductsRepository;
let companiesRepository: InMemoryCompaniesRepository;
let sut: CreateSpecificProductUseCase;

describe("Create Specific Product Use Case", () => {
	beforeEach(() => {
		specificProductsRepository = new InMemorySpecificProductsRepository();
		baseProductsRepository = new InMemoryBaseProductsRepository();
		companiesRepository = new InMemoryCompaniesRepository();
		sut = new CreateSpecificProductUseCase(
			specificProductsRepository,
			baseProductsRepository,
			companiesRepository
		);
	});

	it("should be able to create a specific product", async () => {
		const baseProduct = makeBaseProduct();
		const company = makeCompany();
		const specificProduct = makeSpecificProduct({
			baseProductId: baseProduct.id.toString(),
			companyId: company.id.toString(),
		});

		await baseProductsRepository.create(baseProduct);
		await companiesRepository.create(company);

		const result = await sut.execute({
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId,
			userId: company.userId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(specificProductsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a specific product with non-existent base product", async () => {
		const company = makeCompany();
		const specificProduct = makeSpecificProduct({
			baseProductId: "non-existent-id",
			companyId: company.id.toString(),
		});

		await companiesRepository.create(company);

		const result = await sut.execute({
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId,
			userId: company.userId,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toEqual(
				new CustomError(409, "Esse produto base não existe")
			);
		}
		expect(specificProductsRepository.items).toHaveLength(0);
	});

	it("should not be able to create a specific product for a user without company", async () => {
		const baseProduct = makeBaseProduct();
		const specificProduct = makeSpecificProduct({
			baseProductId: baseProduct.id.toString(),
			companyId: "non-existent-company",
		});

		await baseProductsRepository.create(baseProduct);

		const result = await sut.execute({
			brand: specificProduct.brand,
			model: specificProduct.model,
			description: specificProduct.description,
			unitValue: specificProduct.unitValue,
			warrantyMonths: specificProduct.warrantyMonths,
			budget: specificProduct.budget,
			budgetValidity: specificProduct.budgetValidity,
			baseProductId: specificProduct.baseProductId,
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value).toEqual(
				new CustomError(409, "Você não possui uma empresa cadastrada ainda!")
			);
		}
		expect(specificProductsRepository.items).toHaveLength(0);
	});
});

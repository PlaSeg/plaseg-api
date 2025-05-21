import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeCompany } from "../../../../test/factories/make-company";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";
import { GetSpecificProductUseCase } from "./get-specific-products";

let inMemoryCompaniesRepository: InMemoryCompaniesRepository;
let inMemorySpecificProductsRepository: InMemorySpecificProductsRepository;
let sut: GetSpecificProductUseCase;

describe("Get Specific Products Use Case", () => {
	beforeEach(() => {
		inMemoryCompaniesRepository = new InMemoryCompaniesRepository();
		inMemorySpecificProductsRepository =
			new InMemorySpecificProductsRepository();
		sut = new GetSpecificProductUseCase(
			inMemorySpecificProductsRepository,
			inMemoryCompaniesRepository
		);
	});

	it("should be able to get specific products", async () => {
		const company = makeCompany();
		await inMemoryCompaniesRepository.create(company);

		const specificProduct1 = makeSpecificProduct({
			companyId: company.id.toString(),
		});
		const specificProduct2 = makeSpecificProduct({
			companyId: company.id.toString(),
		});

		await inMemorySpecificProductsRepository.create(specificProduct1);
		await inMemorySpecificProductsRepository.create(specificProduct2);

		const result = await sut.execute({
			userId: company.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			specificProducts: [
				{
					id: specificProduct1.id.toString(),
					brand: specificProduct1.brand,
					model: specificProduct1.model,
					description: specificProduct1.description,
					unitValue: specificProduct1.unitValue,
					warrantyMonths: specificProduct1.warrantyMonths,
					budget: specificProduct1.budget,
					budgetValidity: specificProduct1.budgetValidity,
					baseProductId: specificProduct1.baseProductId,
					createdAt: specificProduct1.createdAt,
					updatedAt: specificProduct1.updatedAt,
				},
				{
					id: specificProduct2.id.toString(),
					brand: specificProduct2.brand,
					model: specificProduct2.model,
					description: specificProduct2.description,
					unitValue: specificProduct2.unitValue,
					warrantyMonths: specificProduct2.warrantyMonths,
					budget: specificProduct2.budget,
					budgetValidity: specificProduct2.budgetValidity,
					baseProductId: specificProduct2.baseProductId,
					createdAt: specificProduct2.createdAt,
					updatedAt: specificProduct2.updatedAt,
				},
			],
		});
	});

	it("should return empty array when company has no specific products", async () => {
		const company = makeCompany();
		await inMemoryCompaniesRepository.create(company);

		const result = await sut.execute({
			userId: company.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			specificProducts: [],
		});
	});

	it("should return error when user has no company", async () => {
		const result = await sut.execute({
			userId: "non-existent-user-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				message: "Você não tem uma empresa cadastrada ainda!",
			})
		);
	});
});

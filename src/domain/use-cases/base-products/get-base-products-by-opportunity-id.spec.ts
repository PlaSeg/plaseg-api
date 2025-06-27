import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBaseProduct, InMemoryBaseProductsRepository } from "../../../../test/repositories/in-memory-base-products-repository";
import { GetBaseProductsByOpportunityIdUseCase } from "./get-base-products-by-opportunity-id";
import { makeBaseProduct } from "../../../../test/factories/make-base-product";
import { makeOpportunity } from "../../../../test/factories/make-opportunity";
import { InMemoryOpportunitiesRepository } from "../../../../test/repositories/in-memory-opportunities-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryOpportunityRepository: InMemoryOpportunitiesRepository;
let sut: GetBaseProductsByOpportunityIdUseCase;

describe("Get Base Products By Opportunity Id Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryOpportunityRepository = new InMemoryOpportunitiesRepository();
		sut = new GetBaseProductsByOpportunityIdUseCase(
			inMemoryBaseProductsRepository
		);
	});

	it("should return base products with budget info for a given opportunity", async () => {
		const opportunity = makeOpportunity();

		const baseProduct1 = makeBaseProduct({
			budget1: 100,
			budget1Validity: new Date(Date.now() + 86400000),
			budget2: 200,
			budget2Validity: new Date(Date.now() + 86400000),
			budget3: 300,
			budget3Validity: new Date(Date.now() + 86400000),
			unitValue: 150,
		});

		const baseProduct2 = makeBaseProduct({
			budget1: 400,
			budget2: 500,
			budget3: 600,
			unitValue: 450,
		});

		await inMemoryBaseProductsRepository.create(baseProduct1);
		await inMemoryBaseProductsRepository.create(baseProduct2);
		await inMemoryOpportunityRepository.create(opportunity);

		await inMemoryBaseProductsRepository.createOpportunityBaseProduct(
			opportunity.id.toString(),
			baseProduct1.id.toString()
		);
		await inMemoryBaseProductsRepository.createOpportunityBaseProduct(
			opportunity.id.toString(),
			baseProduct2.id.toString()
		);

		const result = await sut.execute(opportunity.id.toString());

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(2);

			const firstProduct = result.value.baseProducts[0];
			expect(firstProduct).toHaveProperty("budget");
			expect(firstProduct).toHaveProperty("hasBudgets");
			expect(firstProduct.id).toEqual(baseProduct1.id);
			expect(firstProduct.code).toEqual(baseProduct1.code);
			expect(firstProduct.name).toEqual(baseProduct1.name);
			expect(firstProduct.technicalDescription).toEqual(
				baseProduct1.technicalDescription
			);
			expect(firstProduct.typeId).toEqual(baseProduct1.typeId);
			expect(firstProduct.unitValue).toEqual(baseProduct1.unitValue);

			expect(firstProduct.budget).toBe(200);
			expect(firstProduct.hasBudgets).toBe(true);
		}
	});

	it("should return base products with unitValue as budget when no budgets are available", async () => {
		const opportunityId = "opportunity-456";

		const baseProduct = makeBaseProduct({
			budget1: 0,
			budget2: 0,
			budget3: 0,
			unitValue: 250,
		});

		await inMemoryBaseProductsRepository.create(baseProduct);
		await inMemoryBaseProductsRepository.createOpportunityBaseProduct(
			opportunityId,
			baseProduct.id.toString()
		);

		const result = await sut.execute(opportunityId);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);

			const product = result.value.baseProducts[0];
			expect(product.budget).toBe(250);
			expect(product.hasBudgets).toBe(false);
		}
	});

	it("should handle base products with specific products and valid budgets", async () => {
		const opportunityId = "opportunity-789";

		const baseProduct = makeBaseProduct({
			budget1: 100,
			budget2: 200,
			budget3: 300,
			unitValue: 150,
		});

		const specificProduct1 = makeSpecificProduct({
			budget: 500,
			budgetValidity: new Date(Date.now() + 86400000),
			baseProductId: baseProduct.id.toString(),
		});

		const specificProduct2 = makeSpecificProduct({
			budget: 600,
			budgetValidity: new Date(Date.now() + 172800000),
			baseProductId: baseProduct.id.toString(),
		});

		const specificProduct3 = makeSpecificProduct({
			budget: 700,
			budgetValidity: new Date(Date.now() + 259200000),
			baseProductId: baseProduct.id.toString(),
		});

		const specificProduct4 = makeSpecificProduct({
			budget: 800,
			budgetValidity: new Date(Date.now() + 345600000),
			baseProductId: baseProduct.id.toString(),
		});

		(baseProduct as InMemoryBaseProduct).specificProducts = [
			specificProduct1,
			specificProduct2,
			specificProduct3,
			specificProduct4,
		];

		await inMemoryBaseProductsRepository.create(baseProduct);

		await inMemoryBaseProductsRepository.createOpportunityBaseProduct(
			opportunityId,
			baseProduct.id.toString()
		);

		const result = await sut.execute(opportunityId);

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);

			const product = result.value.baseProducts[0];
			expect(product.budget).toBe(700);
			expect(product.hasBudgets).toBe(true);
		}
	});
});

import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBaseProductsRepository } from "../../../test/repositories/in-memory-base-products-repository";
import { InMemoryTypeRepository } from "../../../test/repositories/in-memory-type-repository";
import { CreateBaseProductUseCase } from "./create-base-product";
import { CreateTypeUseCase } from "./create-type";
import { DomainTypeGroup } from "../entities/value-objects/type-group";
import { makeBaseProduct } from "../../../test/factories/make-base-product";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryTypeRepository: InMemoryTypeRepository;
let sut: CreateBaseProductUseCase;
let createType: CreateTypeUseCase;

describe("Create Base Product Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryTypeRepository = new InMemoryTypeRepository();
		sut = new CreateBaseProductUseCase(inMemoryBaseProductsRepository);
		createType = new CreateTypeUseCase(inMemoryTypeRepository);
	});

	it("should be able to create a base product", async () => {
		// Create a type first
		const typeResult = await createType.execute({
			description: "Test Type",
			group: DomainTypeGroup.SERVICE,
		});

		expect(typeResult.isRight()).toBeTruthy();
		const type = inMemoryTypeRepository.items[0];

		const baseProductData = makeBaseProduct({
			typeId: type.id.toString(),
		});

		const result = await sut.execute({
			code: baseProductData.code,
			name: baseProductData.name,
			technicalDescription: baseProductData.technicalDescription,
			budget1: baseProductData.budget1,
			budget1Validity: baseProductData.budget1Validity,
			budget2: baseProductData.budget2,
			budget2Validity: baseProductData.budget2Validity,
			budget3: baseProductData.budget3,
			budget3Validity: baseProductData.budget3Validity,
			unitValue: baseProductData.unitValue,
			typeId: baseProductData.typeId,
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryBaseProductsRepository.items).toHaveLength(1);

		const baseProduct = inMemoryBaseProductsRepository.items[0];
		expect(baseProduct.code).toBe(baseProductData.code);
		expect(baseProduct.name).toBe(baseProductData.name);
		expect(baseProduct.technicalDescription).toBe(
			baseProductData.technicalDescription
		);
		expect(baseProduct.budget1).toBe(baseProductData.budget1);
		expect(baseProduct.budget2).toBe(baseProductData.budget2);
		expect(baseProduct.budget3).toBe(baseProductData.budget3);
		expect(baseProduct.unitValue).toBe(baseProductData.unitValue);
		expect(baseProduct.typeId).toBe(baseProductData.typeId);
	});

	it("should not be able to create a base product with duplicate code", async () => {
		// Create a type first
		const typeResult = await createType.execute({
			description: "Test Type",
			group: DomainTypeGroup.SERVICE,
		});

		expect(typeResult.isRight()).toBeTruthy();
		const type = inMemoryTypeRepository.items[0];

		const baseProductData = makeBaseProduct({
			typeId: type.id.toString(),
		});

		// Create first product
		await sut.execute({
			code: baseProductData.code,
			name: baseProductData.name,
			technicalDescription: baseProductData.technicalDescription,
			budget1: baseProductData.budget1,
			budget1Validity: baseProductData.budget1Validity,
			budget2: baseProductData.budget2,
			budget2Validity: baseProductData.budget2Validity,
			budget3: baseProductData.budget3,
			budget3Validity: baseProductData.budget3Validity,
			unitValue: baseProductData.unitValue,
			typeId: baseProductData.typeId,
		});

		// Try to create second product with same code
		const result = await sut.execute({
			code: baseProductData.code,
			name: "Different Name",
			technicalDescription: "Different Description",
			budget1: 2000,
			budget1Validity: new Date("2024-12-31"),
			budget2: 3000,
			budget2Validity: new Date("2024-12-31"),
			budget3: 4000,
			budget3Validity: new Date("2024-12-31"),
			unitValue: 600,
			typeId: type.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryBaseProductsRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Produto base com esse código já cadastrado!"
			);
		}
	});
});

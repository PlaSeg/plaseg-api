import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBaseProductsRepository } from "../../../test/repositories/in-memory-base-products-repository";
import { InMemoryTypeRepository } from "../../../test/repositories/in-memory-type-repository";
import { GetBaseProductUseCase } from "./get-base-product";
import { TypeGroup } from "../entities/value-objects/type-group";
import { makeBaseProduct } from "../../../test/factories/make-base-product";
import { makeType } from "../../../test/factories/make-type";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryTypeRepository: InMemoryTypeRepository;
let sut: GetBaseProductUseCase;

describe("Get Base Product Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryTypeRepository = new InMemoryTypeRepository();
		sut = new GetBaseProductUseCase(
			inMemoryBaseProductsRepository,
			inMemoryTypeRepository
		);
	});

	it("should return null when no base products exist", async () => {
		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toBeNull();
		}
	});

	it("should return base products with their category tree", async () => {
		const category = makeType({
			description: "Category Test",
			group: TypeGroup.category(),
		});

		const subcategory = makeType({
			description: "Subcategory Test",
			group: TypeGroup.subcategory(),
			parentId: category.id.toString(),
		});

		const subsubcategory = makeType({
			description: "Subsubcategory Test",
			group: TypeGroup.subsubcategory(),
			parentId: subcategory.id.toString(),
		});

		await inMemoryTypeRepository.create(category);
		await inMemoryTypeRepository.create(subcategory);
		await inMemoryTypeRepository.create(subsubcategory);

		const baseProduct = makeBaseProduct({
			typeId: subsubcategory.id.toString(),
		});

		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);
			expect(result.value.baseProducts?.[0]).toEqual({
				id: baseProduct.id.toString(),
				code: baseProduct.code,
				name: baseProduct.name,
				technicalDescription: baseProduct.technicalDescription,
				budget1: baseProduct.budget1,
				budget1Validity: baseProduct.budget1Validity,
				budget2: baseProduct.budget2,
				budget2Validity: baseProduct.budget2Validity,
				budget3: baseProduct.budget3,
				budget3Validity: baseProduct.budget3Validity,
				unitValue: baseProduct.unitValue,
				typeId: baseProduct.typeId,
				category: "Category Test",
				subcategory: "Subcategory Test",
				subsubcategory: "Subsubcategory Test",
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});

	it("should handle incomplete category trees", async () => {
		const category = makeType({
			description: "Category Test",
			group: TypeGroup.category(),
		});

		await inMemoryTypeRepository.create(category);

		const baseProduct = makeBaseProduct({
			typeId: category.id.toString(),
		});

		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProducts).toHaveLength(1);
			expect(result.value.baseProducts?.[0]).toEqual({
				id: baseProduct.id.toString(),
				code: baseProduct.code,
				name: baseProduct.name,
				technicalDescription: baseProduct.technicalDescription,
				budget1: baseProduct.budget1,
				budget1Validity: baseProduct.budget1Validity,
				budget2: baseProduct.budget2,
				budget2Validity: baseProduct.budget2Validity,
				budget3: baseProduct.budget3,
				budget3Validity: baseProduct.budget3Validity,
				unitValue: baseProduct.unitValue,
				typeId: baseProduct.typeId,
				category: "Category Test",
				subcategory: null,
				subsubcategory: null,
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});
});

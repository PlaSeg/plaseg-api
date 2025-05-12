import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBaseProductsRepository } from "../../../test/repositories/in-memory-base-products-repository";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { GetBaseProductByIdUseCase } from "./get-base-product-by-id";
import { TypeGroup } from "../entities/value-objects/type-group";
import { makeBaseProduct } from "../../../test/factories/make-base-product";
import { makeType } from "../../../test/factories/make-type";

let inMemoryBaseProductsRepository: InMemoryBaseProductsRepository;
let inMemoryTypeRepository: InMemoryTypesRepository;
let sut: GetBaseProductByIdUseCase;

describe("Get Base Product By Id Use Case", () => {
	beforeEach(() => {
		inMemoryBaseProductsRepository = new InMemoryBaseProductsRepository();
		inMemoryTypeRepository = new InMemoryTypesRepository();
		sut = new GetBaseProductByIdUseCase(
			inMemoryBaseProductsRepository,
			inMemoryTypeRepository
		);
	});

	it("should return 404 if base product does not exist", async () => {
		const result = await sut.execute({ id: "non-existent-id" });
		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toBe(404);
			expect(result.value.message).toBe("Produto base não encontrado");
		}
	});

	it("should return base product with its category tree", async () => {
		// Cria árvore de categorias
		const category = makeType({
			description: "Categoria",
			group: TypeGroup.category(),
		});
		const subcategory = makeType({
			description: "Subcategoria",
			group: TypeGroup.subcategory(),
			parentId: category.id.toString(),
		});
		const subsubcategory = makeType({
			description: "Subsubcategoria",
			group: TypeGroup.subsubcategory(),
			parentId: subcategory.id.toString(),
		});
		await inMemoryTypeRepository.create(category);
		await inMemoryTypeRepository.create(subcategory);
		await inMemoryTypeRepository.create(subsubcategory);

		// Cria produto base
		const baseProduct = makeBaseProduct({
			typeId: subsubcategory.id.toString(),
		});
		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute({ id: baseProduct.id.toString() });
		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProduct).toMatchObject({
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
				category: "Categoria",
				subcategory: "Subcategoria",
				subsubcategory: "Subsubcategoria",
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});

	it("should handle incomplete category trees", async () => {
		// Cria apenas categoria
		const category = makeType({
			description: "Categoria",
			group: TypeGroup.category(),
		});
		await inMemoryTypeRepository.create(category);

		// Cria produto base
		const baseProduct = makeBaseProduct({
			typeId: category.id.toString(),
		});
		await inMemoryBaseProductsRepository.create(baseProduct);

		const result = await sut.execute({ id: baseProduct.id.toString() });
		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.baseProduct).toMatchObject({
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
				category: "Categoria",
				subcategory: null,
				subsubcategory: null,
				createdAt: baseProduct.createdAt,
				updatedAt: baseProduct.updatedAt,
			});
		}
	});
});

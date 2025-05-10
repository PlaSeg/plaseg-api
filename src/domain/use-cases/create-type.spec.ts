import { describe, it, expect, beforeEach } from "vitest";
import { CreateTypeUseCase } from "./create-type";
import { TypeGroup } from "../entities/value-objects/type-group";
import { InMemoryTypeRepository } from "../../../test/repositories/in-memory-type-repository";
import { makeType } from "../../../test/factories/make-type";

let inMemoryTypeRepository: InMemoryTypeRepository;
let sut: CreateTypeUseCase;

describe("Create Type Use Case", () => {
	beforeEach(() => {
		inMemoryTypeRepository = new InMemoryTypeRepository();
		sut = new CreateTypeUseCase(inMemoryTypeRepository);
	});

	it("should be able to create a type", async () => {
		const typeData = makeType({
			description: "Test Type 1",
		});

		const result = await sut.execute({
			description: typeData.description,
			group: typeData.group.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryTypeRepository.items).toHaveLength(1);
		expect(inMemoryTypeRepository.items[0].description).toBe(
			typeData.description
		);
	});

	it("should not be able to create a type with same description", async () => {
		const typeData = makeType({
			description: "Test Type 2",
		});

		await sut.execute({
			description: typeData.description,
			group: typeData.group.toString(),
		});

		const result = await sut.execute({
			description: typeData.description,
			group: typeData.group.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toHaveProperty("message", "Categoria já cadastrada");
	});

	it("should not be able to create a category with parent", async () => {
		const typeData = makeType({
			description: "Test Type 3",
			group: TypeGroup.category(),
		});

		const result = await sut.execute({
			description: typeData.description,
			group: typeData.group.toString(),
			parentId: "some-parent-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toHaveProperty(
			"message",
			"Categoria não deve ter pai."
		);
	});

	it("should not be able to create a type with invalid parent hierarchy", async () => {
		// Create a category first
		const categoryData = makeType({
			description: "Test Type 4",
			group: TypeGroup.category(),
		});

		await sut.execute({
			description: categoryData.description,
			group: categoryData.group.toString(),
		});

		const parentType = inMemoryTypeRepository.items[0];

		// Try to create a service with category as parent
		const serviceData = makeType({
			description: "Test Type 5",
			group: TypeGroup.service(),
		});

		const result = await sut.execute({
			description: serviceData.description,
			group: serviceData.group.toString(),
			parentId: parentType.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toHaveProperty(
			"message",
			"Você está cadatrando o pai como uma categoria."
		);
	});

	it("should be able to create a subcategory with category as parent", async () => {
		// Create a category first
		const categoryData = makeType({
			description: "Test Type 6",
			group: TypeGroup.category(),
		});

		await sut.execute({
			description: categoryData.description,
			group: categoryData.group.toString(),
		});

		const parentType = inMemoryTypeRepository.items[0];

		// Create a subcategory with the category as parent
		const subcategoryData = makeType({
			description: "Test Type 7",
			group: TypeGroup.subcategory(),
		});

		const result = await sut.execute({
			description: subcategoryData.description,
			group: subcategoryData.group.toString(),
			parentId: parentType.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryTypeRepository.items).toHaveLength(2);
		expect(inMemoryTypeRepository.items[1].description).toBe(
			subcategoryData.description
		);
	});

	it("should not be able to create a type with subcategory as parent if not subsubcategory", async () => {
		// Create a category first
		const categoryData = makeType({
			description: "Test Type 8",
			group: TypeGroup.category(),
		});

		await sut.execute({
			description: categoryData.description,
			group: categoryData.group.toString(),
		});

		const parentCategory = inMemoryTypeRepository.items[0];

		// Create a subcategory
		const subcategoryData = makeType({
			description: "Test Type 9",
			group: TypeGroup.subcategory(),
		});

		await sut.execute({
			description: subcategoryData.description,
			group: subcategoryData.group.toString(),
			parentId: parentCategory.id.toString(),
		});

		const parentSubcategory = inMemoryTypeRepository.items[1];

		// Try to create a service with subcategory as parent
		const serviceData = makeType({
			description: "Test Type 10",
			group: TypeGroup.service(),
		});

		const result = await sut.execute({
			description: serviceData.description,
			group: serviceData.group.toString(),
			parentId: parentSubcategory.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toHaveProperty(
			"message",
			"Você está cadastrando o pai como uma subcategoria."
		);
	});
});

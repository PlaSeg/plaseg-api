import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";
import { CreateTypeUseCase } from "./create-type";
import { makeType } from "../../../../test/factories/make-type";
import {
	DomainTypeGroup,
	TypeGroup,
} from "../../entities/value-objects/type-group";

let inMemoryTypeRepository: InMemoryTypesRepository;
let sut: CreateTypeUseCase;

describe("Create Type Use Case", () => {
	beforeEach(() => {
		inMemoryTypeRepository = new InMemoryTypesRepository();
		sut = new CreateTypeUseCase(inMemoryTypeRepository);
	});

	it("should be able to create a type", async () => {
		const result = await sut.execute({
			description: "New Type",
			group: "OPPORTUNITY",
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(1);
		expect(inMemoryTypeRepository.items[0].description).toBe("New Type");
		expect(inMemoryTypeRepository.items[0].group.getValue()).toBe(
			DomainTypeGroup.OPPORTUNITY
		);
	});

	it("should not be able to create a type with a description that already exists", async () => {
		const existingType = makeType({
			description: "Existing Type",
			group: TypeGroup.service(),
		});

		inMemoryTypeRepository.items.push(existingType);

		const result = await sut.execute({
			description: "Existing Type",
			group: "OPPORTUNITY",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(1);
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Tipo já cadastrado");
		}
	});

	it("should not allow a category to have a parent", async () => {
		const existingType = makeType({
			description: "Parent Type",
			group: TypeGroup.category(),
		});

		inMemoryTypeRepository.items.push(existingType);

		const result = await sut.execute({
			description: "New Category",
			group: "CATEGORY",
			parentId: existingType.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Uma categoria não pode ter um tipo pai."
			);
		}
	});

	it("should not allow creating a type with non-existent parent", async () => {
		const result = await sut.execute({
			description: "New Subcategory",
			group: "SUBCATEGORY",
			parentId: "non-existent-id",
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(0);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Este tipo pai não existe!");
		}
	});

	it("should only allow a category to be parent of subcategories", async () => {
		const parentType = makeType({
			description: "Parent Category",
			group: TypeGroup.category(),
		});

		inMemoryTypeRepository.items.push(parentType);

		const result = await sut.execute({
			description: "New Type",
			group: "SUBSUBCATEGORY",
			parentId: parentType.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Uma categoria só pode ser pai de subcategorias"
			);
		}
	});

	it("should only allow a subcategory to be parent of subsubcategories", async () => {
		const parentType = makeType({
			description: "Parent Subcategory",
			group: TypeGroup.subcategory(),
		});

		inMemoryTypeRepository.items.push(parentType);

		const result = await sut.execute({
			description: "New Type",
			group: "OPPORTUNITY",
			parentId: parentType.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Uma subcategoria só pode ser pai de subsubcategorias."
			);
		}
	});

	it("should be able to create a subcategory with a category parent", async () => {
		const parentType = makeType({
			description: "Parent Category",
			group: TypeGroup.category(),
		});

		inMemoryTypeRepository.items.push(parentType);

		const result = await sut.execute({
			description: "New Subcategory",
			group: "SUBCATEGORY",
			parentId: parentType.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(2);
		expect(inMemoryTypeRepository.items[1].description).toBe("New Subcategory");
		expect(inMemoryTypeRepository.items[1].group.getValue()).toBe(
			DomainTypeGroup.SUBCATEGORY
		);
		expect(inMemoryTypeRepository.items[1].parentId).toBe(
			parentType.id.toString()
		);
	});

	it("should be able to create a subsubcategory with a subcategory parent", async () => {
		const parentType = makeType({
			description: "Parent Subcategory",
			group: TypeGroup.subcategory(),
		});

		inMemoryTypeRepository.items.push(parentType);

		const result = await sut.execute({
			description: "New Subsubcategory",
			group: "SUBSUBCATEGORY",
			parentId: parentType.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(2);
		expect(inMemoryTypeRepository.items[1].description).toBe(
			"New Subsubcategory"
		);
		expect(inMemoryTypeRepository.items[1].group.getValue()).toBe(
			DomainTypeGroup.SUBSUBCATEGORY
		);
		expect(inMemoryTypeRepository.items[1].parentId).toBe(
			parentType.id.toString()
		);
	});
});

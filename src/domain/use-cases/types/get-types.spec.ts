import { describe, it, beforeEach } from "vitest";
import { InMemoryTypeRepository } from "../../../../test/repositories/in-memory-type-repository";
import { GetTypesUseCase } from "./get-types";
import { makeType } from "../../../../test/factories/make-type";
import { TypeGroup } from "../../entities/value-objects/type-group";

let inMemoryTypeRepository: InMemoryTypeRepository;
let sut: GetTypesUseCase;

describe("Get Types Use Case", () => {
	beforeEach(() => {
		inMemoryTypeRepository = new InMemoryTypeRepository();
		sut = new GetTypesUseCase(inMemoryTypeRepository);
	});

	it("should be able to get types", async () => {
		const type = makeType({
			description: "Test Type",
		});
		const type2 = makeType({
			description: "Test Type 2",
		});

		await inMemoryTypeRepository.create(type);
		await inMemoryTypeRepository.create(type2);

		const result = await sut.execute({});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: "Test Type",
						group: "OPPORTUNITY",
						parent: null,
						updatedAt: null,
					},
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: "Test Type 2",
						group: "OPPORTUNITY",
						parent: null,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should be able to filter types by group", async () => {
		const category = makeType({
			description: "Arma de Fogo",
			group: TypeGroup.category(),
		});

		await inMemoryTypeRepository.create(category);

		const subcategory = makeType({
			description: "Pistola",
			group: TypeGroup.subcategory(),
			parentId: category.id.toString(),
		});

		await inMemoryTypeRepository.create(subcategory);

		const result = await sut.execute({
			group: "SUBCATEGORY",
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: subcategory.description,
						group: subcategory.group.toString(),
						parent: category.description,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should be able to filter types by parent", async () => {
		const category = makeType({
			description: "Arma de Fogo",
			group: TypeGroup.category(),
		});

		await inMemoryTypeRepository.create(category);

		const subcategory = makeType({
			description: "Pistola",
			group: TypeGroup.subcategory(),
			parentId: category.id.toString(),
		});

		await inMemoryTypeRepository.create(subcategory);

		const result = await sut.execute({
			parentId: category.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({
				types: [
					{
						id: expect.any(String),
						createdAt: expect.any(Date),
						description: subcategory.description,
						group: subcategory.group.toString(),
						parent: category.description,
						updatedAt: null,
					},
				],
			});
		}
	});

	it("should return null if there are no types", async () => {
		const result = await sut.execute({});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value).toEqual({ types: null });
		}
	});
});

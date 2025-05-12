import { InMemoryTypeRepository } from "../../../../test/repositories/in-memory-type-repository";
import { DeleteTypeUseCase } from "./delete-type";
import { makeType } from "../../../../test/factories/make-type";
import { TypeGroup } from "../../entities/value-objects/type-group";

let inMemoryTypeRepository: InMemoryTypeRepository;
let sut: DeleteTypeUseCase;

describe("Delete Type Use Case", () => {
	beforeEach(() => {
		inMemoryTypeRepository = new InMemoryTypeRepository();
		sut = new DeleteTypeUseCase(inMemoryTypeRepository);
	});

	it("should be able to delete a type", async () => {
		const type = makeType({
			description: "Type to Delete",
			group: TypeGroup.service(),
		});

		inMemoryTypeRepository.items.push(type);

		const result = await sut.execute({
			id: type.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(0);
	});

	it("should not be able to delete a non-existent type", async () => {
		const result = await sut.execute({
			id: "non-existent-id",
		});

		expect(result.isLeft()).toBeTruthy();

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Tipo não encontrado");
		}
	});

	it("should not be able to delete a type that has children", async () => {
		const parentType = makeType({
			description: "Parent Type",
			group: TypeGroup.category(),
		});

		const childType = makeType({
			description: "Child Type",
			group: TypeGroup.subcategory(),
			parentId: parentType.id.toString(),
		});

		inMemoryTypeRepository.items.push(parentType);
		inMemoryTypeRepository.items.push(childType);

		const result = await sut.execute({
			id: parentType.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryTypeRepository.items).toHaveLength(2);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Não é possível excluir um tipo que possui subtipos"
			);
		}
	});
});

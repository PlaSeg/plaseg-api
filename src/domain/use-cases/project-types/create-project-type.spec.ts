import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-types-repository";
import { CreateProjectTypeUseCase } from "./create-project-type";

let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: CreateProjectTypeUseCase;

describe("Create Project Type Use Case", () => {
	beforeEach(() => {
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new CreateProjectTypeUseCase(inMemoryProjectTypesRepository);
	});

	it("should be able to create a project type", async () => {
		const result = await sut.execute({
			name: "Tipo de Projeto Teste",
			fields: [
				{
					id: "1",
					name: "Campo 1",
					value: "Valor 1",
				},
				{
					id: "2",
					name: "Campo 2",
					value: "Valor 2",
					parentId: "1",
				},
				{
					id: "3",
					name: "Campo 3",
					value: "Valor 3",
				},
				{
					id: "4",
					name: "Campo 2",
					value: "Valor 2",
					parentId: "3",
				},
			],
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryProjectTypesRepository.items).toHaveLength(1);
		expect(inMemoryProjectTypesRepository.items[0].name).toBe(
			"Tipo de Projeto Teste"
		);
		expect(inMemoryProjectTypesRepository.items[0].fields).toHaveLength(2);
	});

	it("should not be able to create a project type with duplicate name", async () => {
		await sut.execute({
			name: "Tipo de Projeto Teste",
			fields: [
				{
					id: "1",
					name: "Campo 1",
					value: "Valor 1",
				},
			],
		});

		const result = await sut.execute({
			name: "Tipo de Projeto Teste",
			fields: [
				{
					id: "1",
					name: "Campo 1",
					value: "Valor 1",
				},
			],
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(
			expect.objectContaining({
				message: "O tipo de projeto com esse nome já existe!",
			})
		);
	});
});

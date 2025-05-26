import { describe, it, beforeEach } from "vitest";
import { GetProjectTypeByIdUseCase } from "./get-project-type-by-id";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-types-repository";
import { makeProjectType } from "../../../../test/factories/make-project-type";
import { CustomError } from "../../../core/errors/custom-error";

let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: GetProjectTypeByIdUseCase;

describe("Get Project Type By Id Use Case", () => {
	beforeEach(() => {
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new GetProjectTypeByIdUseCase(inMemoryProjectTypesRepository);
	});

	it("should be able to get a project type by id", async () => {
		const projectType = makeProjectType();

		await inMemoryProjectTypesRepository.create(projectType);

		const result = await sut.execute({
			id: projectType.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryProjectTypesRepository.items[0]).toEqual(
				result.value.projectType
			);
		}
	});

	it("should return error when project type does not exist", async () => {
		const result = await sut.execute({
			id: "non-existent-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(CustomError);
		expect(result.value).toEqual(
			expect.objectContaining({
				statusCode: 404,
				message: "Tipo de projeto não encontrado.",
			})
		);
	});
});

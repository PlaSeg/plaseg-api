import { describe, it, beforeEach } from "vitest";
import { GetProjectTypesUseCase } from "./get-project-types";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-types-repository";
import { makeProjectType } from "../../../../test/factories/make-project-type";

let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: GetProjectTypesUseCase;

describe("Get Project Types Use Case", () => {
	beforeEach(() => {
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new GetProjectTypesUseCase(inMemoryProjectTypesRepository);
	});

	it("should be able to get project types", async () => {
		const projectType1 = makeProjectType({ name: "Tipo 1" });
		const projectType2 = makeProjectType({ name: "Tipo 2" });

		await inMemoryProjectTypesRepository.create(projectType1);
		await inMemoryProjectTypesRepository.create(projectType2);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryProjectTypesRepository.items[0]).toEqual(
				result.value.projectTypes[0]
			);
			expect(inMemoryProjectTypesRepository.items[1]).toEqual(
				result.value.projectTypes[1]
			);
		}
	});
});

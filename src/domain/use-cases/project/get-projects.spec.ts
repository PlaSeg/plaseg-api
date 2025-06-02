import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { GetProjectsUseCase } from "./get-projects";
import { makeProject } from "../../../../test/factories/make-project";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let sut: GetProjectsUseCase;

describe("Get Projects Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		sut = new GetProjectsUseCase(inMemoryProjectsRepository);
	});

	it("should be able to get projects", async () => {

		const project = makeProject();

		await inMemoryProjectsRepository.create(
			project
		);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.projects).toHaveLength(1);
			expect(result.value.projects[0]).toEqual(project);
		}
	});
});

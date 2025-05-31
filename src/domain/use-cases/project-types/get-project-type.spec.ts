import { describe, it, beforeEach, expect } from "vitest";
import { GetProjectTypesUseCase } from "./get-project-types";
import { makeProjectType } from "../../../../test/factories/make-project-type";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-type-repository";

let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: GetProjectTypesUseCase;

describe("Get Project Types Use Case", () => {
  beforeEach(() => {
    inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
    sut = new GetProjectTypesUseCase(inMemoryProjectTypesRepository);
  });

  it("should be able to get project types", async () => {
    const projectType = makeProjectType();

    await inMemoryProjectTypesRepository.create(projectType);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.projectTypes[0]).toEqual(inMemoryProjectTypesRepository.items[0]);
    }
  });
});

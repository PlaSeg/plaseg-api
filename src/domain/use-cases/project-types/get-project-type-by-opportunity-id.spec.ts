import { describe, it, beforeEach, expect } from "vitest";
import { GetProjectTypesByOpportunityIdUseCase } from "./get-project-type-by-opportunity-id";
import { makeProjectType } from "../../../../test/factories/make-project-type";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-type-repository";

let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: GetProjectTypesByOpportunityIdUseCase;

describe("Get Project Types By Opportunity ID Use Case", () => {
	beforeEach(() => {
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new GetProjectTypesByOpportunityIdUseCase(
			inMemoryProjectTypesRepository
		);
	});

	it("should be able to get project types by opportunity id", async () => {
		const projectType1 = makeProjectType();
		const projectType2 = makeProjectType();
		const opportunityId = "opportunity-1";

		await inMemoryProjectTypesRepository.create(projectType1);
		await inMemoryProjectTypesRepository.create(projectType2);

		inMemoryProjectTypesRepository.opportunityProjectTypes.push({
			opportunityId,
			projectTypeId: projectType1.id.toString(),
		});

		const result = await sut.execute(opportunityId);

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(result.value.projectTypes).toHaveLength(1);
			expect(result.value.projectTypes[0]).toEqual(projectType1);
		}
	});
});

import { describe, it, beforeEach } from "vitest";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { GetOpportunitiesUseCase } from "./get-opportunities";
import { makeOpportunity } from "../../../test/factories/make-opportunity";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let sut: GetOpportunitiesUseCase;

describe("Get Opportunities Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		sut = new GetOpportunitiesUseCase(inMemoryOpportunitiesRepository);
	});

	it("should be able to get opportunities", async () => {
		const opportunity = makeOpportunity();

		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		expect(result.value).not.toBeNull();

		if (result.isRight() && result.value) {
			expect(result.value.opportunities).toHaveLength(1);
			expect(result.value.opportunities).toEqual([
				expect.objectContaining({
					id: opportunity.id.toString(),
				}),
			]);
		}
	});
});

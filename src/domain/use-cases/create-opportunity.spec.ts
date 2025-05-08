import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { CreateOpportunityUseCase } from "./create-opportunity";
import { makeOpportunity } from "../../../test/factories/make-opportunity";
import { makeRequiredDocument } from "../../../test/factories/make-required-document";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let sut: CreateOpportunityUseCase;

describe("Create Opportunity Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		sut = new CreateOpportunityUseCase(inMemoryOpportunitiesRepository);
	});

	it("should be able to create an opportunity", async () => {
		const opportunityData = makeOpportunity();
		const requiredDocument = makeRequiredDocument();

		const result = await sut.execute({
			title: opportunityData.title,
			description: opportunityData.description,
			availableValue: opportunityData.availableValue,
			minValue: opportunityData.minValue,
			maxValue: opportunityData.maxValue,
			initialDeadline: opportunityData.initialDeadline,
			finalDeadline: opportunityData.finalDeadline,
			requiresCounterpart: opportunityData.requiresCounterpart,
			counterpartPercentage: opportunityData.counterpartPercentage,
			requiredDocuments: [
				{
					name: requiredDocument.name,
					description: requiredDocument.description,
					model: requiredDocument.model,
				},
			],
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(1);
		if (result.isRight()) {
			expect(inMemoryOpportunitiesRepository.items[0]).toEqual(
				result.value.opportunity
			);
		}
	});
});

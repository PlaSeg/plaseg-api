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
			const { opportunity } = result.value;
			expect(opportunity.title).toBe(opportunityData.title);
			expect(opportunity.description).toBe(opportunityData.description);
			expect(opportunity.availableValue).toBe(opportunityData.availableValue);
			expect(opportunity.minValue).toBe(opportunityData.minValue);
			expect(opportunity.maxValue).toBe(opportunityData.maxValue);
			expect(opportunity.requiresCounterpart).toBe(
				opportunityData.requiresCounterpart
			);
			expect(opportunity.counterpartPercentage).toBe(
				opportunityData.counterpartPercentage
			);
			expect(opportunity.requiredDocuments).toHaveLength(1);
			expect(opportunity.requiredDocuments[0].name).toBe(requiredDocument.name);
			expect(opportunity.requiredDocuments[0].description).toBe(
				requiredDocument.description
			);
			expect(opportunity.requiredDocuments[0].model).toBe(
				requiredDocument.model
			);
		}
	});

	it("should not be able to create an opportunity with duplicate title", async () => {
		const opportunityData = makeOpportunity();
		const requiredDocument = makeRequiredDocument();

		await sut.execute({
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

		const result = await sut.execute({
			title: opportunityData.title,
			description: "Different description",
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

		expect(result.isLeft()).toBeTruthy();
		expect(inMemoryOpportunitiesRepository.items).toHaveLength(1);

		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Título já cadastrado");
		}
	});
});

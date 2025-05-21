import { InMemoryOpportunitiesRepository } from "../../../../test/repositories/in-memory-opportunities-repository";
import { CreateOpportunityUseCase } from "./create-opportunity";
import { makeOpportunity } from "../../../../test/factories/make-opportunity";
import { makeRequiredDocument } from "../../../../test/factories/make-required-document";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { Type } from "../../entities/type";
import { InMemoryTypesRepository } from "../../../../test/repositories/in-memory-types-repository";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: CreateOpportunityUseCase;

describe("Create Opportunity Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new CreateOpportunityUseCase(
			inMemoryOpportunitiesRepository,
			inMemoryTypesRepository
		);
	});

	it("should be able to create an opportunity", async () => {
		const opportunityData = makeOpportunity();
		const requiredDocument = makeRequiredDocument();

		const type = Type.create({
			description: "Edital",
			group: TypeGroup.opportunity(),
		});

		await inMemoryTypesRepository.create(type);

		const result = await sut.execute({
			title: opportunityData.title,
			description: opportunityData.description,
			responsibleAgency: opportunityData.responsibleAgency,
			availableValue: opportunityData.availableValue,
			minValue: opportunityData.minValue,
			maxValue: opportunityData.maxValue,
			initialDeadline: opportunityData.initialDeadline,
			finalDeadline: opportunityData.finalDeadline,
			requiresCounterpart: opportunityData.requiresCounterpart,
			counterpartPercentage: opportunityData.counterpartPercentage,
			type: type.description,
			typeId: type.id.toString(),
			requiredDocuments: [
				{
					name: requiredDocument.name,
					description: requiredDocument.description,
					model: requiredDocument.model,
				},
			],
		});

		expect(result.isRight()).toBe(true);
		if (result.isRight()) {
			expect(inMemoryOpportunitiesRepository.items[0]).toEqual(
				result.value.opportunity
			);
		}
	});
});

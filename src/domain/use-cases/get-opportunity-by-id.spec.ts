import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { GetOpportunityByIdUseCase } from "./get-opportunity-by-id";
import { makeOpportunity } from "../../../test/factories/make-opportunity";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { makeType } from "../../../test/factories/make-type";
import { TypeGroup } from "../../domain/entities/value-objects/type-group";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: GetOpportunityByIdUseCase;

describe("Get Opportunity By Id Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new GetOpportunityByIdUseCase(
			inMemoryOpportunitiesRepository,
			inMemoryTypesRepository
		);
	});

	it("should be able to get an opportunity by id", async () => {
		const type = makeType({
			group: TypeGroup.opportunity(),
		});
		await inMemoryTypesRepository.create(type);

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute({
			opportunityId: opportunity.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.opportunity).not.toBeNull();
			expect(result.value.opportunity).toEqual(
				expect.objectContaining({
					id: opportunity.id.toString(),
					title: opportunity.title,
					description: opportunity.description,
					typeDescription: type.description,
				})
			);
		}
	});

	it("should not be able to get an opportunity with non-existing id", async () => {
		const result = await sut.execute({
			opportunityId: "6d3bc502-7e7d-40b5-a6c6-e58e9fc7924c",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Oportunidade não encontrada");
		}
	});
});

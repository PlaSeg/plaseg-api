import { describe, it, beforeEach } from "vitest";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { GetOpportunitiesUseCase } from "./get-opportunities";
import { makeOpportunity } from "../../../test/factories/make-opportunity";
import { InMemoryTypesRepository } from "../../../test/repositories/in-memory-types-repository";
import { makeType } from "../../../test/factories/make-type";
import { TypeGroup } from "../../domain/entities/value-objects/type-group";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryTypesRepository: InMemoryTypesRepository;
let sut: GetOpportunitiesUseCase;

describe("Get Opportunities Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryTypesRepository = new InMemoryTypesRepository();
		sut = new GetOpportunitiesUseCase(
			inMemoryOpportunitiesRepository,
			inMemoryTypesRepository
		);
	});

	it("should be able to get opportunities", async () => {
		const type = makeType({
			group: TypeGroup.opportunity(),
		});
		await inMemoryTypesRepository.create(type);

		const opportunity = makeOpportunity({
			typeId: type.id.toString(),
		});

		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute();

		expect(result.isRight()).toBe(true);
		expect(result.value).not.toBeNull();

		if (result.isRight() && result.value) {
			expect(result.value.opportunities).toHaveLength(1);
			expect(result.value.opportunities).toEqual([
				expect.objectContaining({
					id: opportunity.id.toString(),
					typeDescription: type.description,
				}),
			]);
		}
	});
});

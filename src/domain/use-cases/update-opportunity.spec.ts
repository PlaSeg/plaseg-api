import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryOpportunitiesRepository } from "../../../test/repositories/in-memory-opportunities-repository";
import { UpdateOpportunityUseCase } from "./update-opportunity";
import { makeOpportunity } from "../../../test/factories/make-opportunity";

let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let sut: UpdateOpportunityUseCase;

describe("Update Opportunity Use Case", () => {
	beforeEach(() => {
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		sut = new UpdateOpportunityUseCase(inMemoryOpportunitiesRepository);
	});

	it("should be able to update an opportunity", async () => {
		const opportunity = makeOpportunity();
		await inMemoryOpportunitiesRepository.create(opportunity);

		const newOpportunity = makeOpportunity();
		const { ...updateData } = newOpportunity;

		const result = await sut.execute({
			id: opportunity.id.toString(),
			...updateData,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			const { opportunity: updatedOpportunity } = result.value;

			// Verificar campos principais e datas
			expect(updatedOpportunity).toEqual(
				expect.objectContaining({
					id: opportunity.id.toString(),
					title: newOpportunity.title,
					description: newOpportunity.description,
					availableValue: newOpportunity.availableValue,
					minValue: newOpportunity.minValue,
					maxValue: newOpportunity.maxValue,
					requiresCounterpart: newOpportunity.requiresCounterpart,
					counterpartPercentage: newOpportunity.counterpartPercentage,
					initialDeadline: expect.any(Date),
					finalDeadline: expect.any(Date),
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				})
			);

			expect(updatedOpportunity.requiredDocuments).toHaveLength(
				newOpportunity.requiredDocuments.length
			);
			updatedOpportunity.requiredDocuments.forEach((doc, index) => {
				expect(doc).toEqual(
					expect.objectContaining({
						name: newOpportunity.requiredDocuments[index].name,
						description: newOpportunity.requiredDocuments[index].description,
						model: newOpportunity.requiredDocuments[index].model,
						createdAt: expect.any(Date),
						updatedAt: null,
					})
				);
			});
		}
	});

	it("should not be able to update an opportunity with non-existing id", async () => {
		const { ...updateData } = makeOpportunity();

		const result = await sut.execute({
			id: "6d3bc502-7e7d-40b5-a6c6-e58e9fc7924c",
			...updateData,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual("Oportunidade não encontrada");
		}
	});

	it("should not be able to update an opportunity with an existing title", async () => {
		const [opportunity1, opportunity2] = [makeOpportunity(), makeOpportunity()];

		await inMemoryOpportunitiesRepository.create(opportunity1);
		await inMemoryOpportunitiesRepository.create(opportunity2);

		const result = await sut.execute({
			id: opportunity2.id.toString(),
			title: opportunity1.title,
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual("Título já cadastrado");
		}
	});

	it("should be able to update only provided fields", async () => {
		const opportunity = makeOpportunity();
		await inMemoryOpportunitiesRepository.create(opportunity);

		const newTitle = "New Title";
		const result = await sut.execute({
			id: opportunity.id.toString(),
			title: newTitle,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.opportunity).toEqual(
				expect.objectContaining({
					id: opportunity.id.toString(),
					title: newTitle,
					description: opportunity.description,
					availableValue: opportunity.availableValue,
					minValue: opportunity.minValue,
					maxValue: opportunity.maxValue,
					initialDeadline: opportunity.initialDeadline,
					finalDeadline: opportunity.finalDeadline,
					requiresCounterpart: opportunity.requiresCounterpart,
					counterpartPercentage: opportunity.counterpartPercentage,
				})
			);
		}
	});

	it("should be able to update required documents", async () => {
		const opportunity = makeOpportunity();
		await inMemoryOpportunitiesRepository.create(opportunity);

		const newDocuments = [
			{
				name: "New Document",
				description: "New Description",
				model: "New Model",
			},
		];

		const result = await sut.execute({
			id: opportunity.id.toString(),
			requiredDocuments: newDocuments,
		});

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.opportunity.requiredDocuments).toHaveLength(1);
			expect(result.value.opportunity.requiredDocuments[0]).toEqual(
				expect.objectContaining({
					name: newDocuments[0].name,
					description: newDocuments[0].description,
					model: newDocuments[0].model,
				})
			);
		}
	});
});

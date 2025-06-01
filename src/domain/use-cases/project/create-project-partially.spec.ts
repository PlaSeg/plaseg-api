import { describe, it, expect, beforeEach } from "vitest";
import { CreateProjectPartiallyUseCase } from "./create-project-partially";
import { InMemoryProjectsRepository } from "../../../../test/repositories/in-memory-projects-repository";
import { InMemoryOpportunitiesRepository } from "../../../../test/repositories/in-memory-opportunities-repository";
import { InMemoryProjectTypesRepository } from "../../../../test/repositories/in-memory-project-type-repository";
import { makeOpportunity } from "../../../../test/factories/make-opportunity";
import { makeProjectType } from "../../../../test/factories/make-project-type";
import { Field } from "../../entities/field";
import { Document } from "../../entities/document";

let inMemoryProjectsRepository: InMemoryProjectsRepository;
let inMemoryOpportunitiesRepository: InMemoryOpportunitiesRepository;
let inMemoryProjectTypesRepository: InMemoryProjectTypesRepository;
let sut: CreateProjectPartiallyUseCase;

describe("Create Project Partially Use Case", () => {
	beforeEach(() => {
		inMemoryProjectsRepository = new InMemoryProjectsRepository();
		inMemoryOpportunitiesRepository = new InMemoryOpportunitiesRepository();
		inMemoryProjectTypesRepository = new InMemoryProjectTypesRepository();
		sut = new CreateProjectPartiallyUseCase(
			inMemoryProjectsRepository,
			inMemoryOpportunitiesRepository,
			inMemoryProjectTypesRepository
		);
	});

	it("should return error if opportunity does not exist", async () => {
		const result = await sut.execute({
			title: "Test Project",
			opportunityId: "non-existent-id",
			projectTypeId: "any-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value?.message).toBe("Essa oportunidade não existe!");
	});

	it("should return error if project type does not exist", async () => {
		const opportunity = makeOpportunity();
		await inMemoryOpportunitiesRepository.create(opportunity);

		const result = await sut.execute({
			title: "Test Project",
			opportunityId: opportunity.id.toString(),
			projectTypeId: "non-existent-id",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value?.message).toBe("Esse tipo de projeto não existe!");
	});

	it("should be able to create a partial project with merged documents", async () => {
        const field1 = Field.create({
            name: "Field A",
            value: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const opportunityDocument = Document.create({
            name: "Doc 1",
            fields: [field1],
        });

        const opportunity = makeOpportunity({
            documents: [opportunityDocument],
        });

		await inMemoryOpportunitiesRepository.create(opportunity);

		const field2 = Field.create({
			name: "Field A",
			value: "Default Value",
			createdAt: new Date(),
			updatedAt: new Date()
		});

		const projectTypeDocument = Document.create({
			name: "Doc 1",
			fields: [field2],
		});

		const projectType = makeProjectType({
			documents: [projectTypeDocument],
		});

		await inMemoryProjectTypesRepository.create(projectType);

		const result = await sut.execute({
			title: "My Partial Project",
			opportunityId: opportunity.id.toString(),
			projectTypeId: projectType.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryProjectsRepository.items.length).toBe(1);

		const created = inMemoryProjectsRepository.items[0];
		expect(created.title).toBe("My Partial Project");
		expect(created.documents[0].fields[0].value).toBe("Default Value");
	});
});

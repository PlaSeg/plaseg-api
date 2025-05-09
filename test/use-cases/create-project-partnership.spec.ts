import { InMemoryProjectPartnershipRepository } from "../repositories/in-memory-project-partnership-repository";
import { InMemoryMunicipalitiesRepository } from "../repositories/in-memory-municipalities-repository";
import { CreateProjectPartnershipUseCase } from "../../src/domain/use-cases/create-project-partnership";
import { makeProjectPartnership } from "../factories/make-project-partnership";
import { makeMunicipality } from "../factories/make-municipality";

let inMemoryProjectPartnershipRepository: InMemoryProjectPartnershipRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateProjectPartnershipUseCase;

describe("Create Project Partnership Use Case", () => {
	beforeEach(() => {
		inMemoryProjectPartnershipRepository =
			new InMemoryProjectPartnershipRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateProjectPartnershipUseCase(
			inMemoryProjectPartnershipRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a project partnership", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const projectPartnership = makeProjectPartnership();

		const result = await sut.execute({
			term: projectPartnership.term,
			agency: projectPartnership.agency,
			objective: projectPartnership.objective,
			status: projectPartnership.status,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryProjectPartnershipRepository.items[0]).toEqual(
			expect.objectContaining({
				term: projectPartnership.term,
				agency: projectPartnership.agency,
				objective: projectPartnership.objective,
				status: projectPartnership.status,
			})
		);
	});
});

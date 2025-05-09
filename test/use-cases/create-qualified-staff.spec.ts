import { InMemoryQualifiedStaffRepository } from "../repositories/in-memory-qualified-staff-repository";
import { InMemoryMunicipalitiesRepository } from "../repositories/in-memory-municipalities-repository";
import { CreateQualifiedStaffUseCase } from "../../src/domain/use-cases/create-qualified-staff";
import { makeQualifiedStaff } from "../factories/make-qualified-staff";
import { makeMunicipality } from "../factories/make-municipality";

let inMemoryQualifiedStaffRepository: InMemoryQualifiedStaffRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateQualifiedStaffUseCase;

describe("Create Qualified Staff Use Case", () => {
	beforeEach(() => {
		inMemoryQualifiedStaffRepository = new InMemoryQualifiedStaffRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateQualifiedStaffUseCase(
			inMemoryQualifiedStaffRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a qualified staff", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const qualifiedStaff = makeQualifiedStaff();

		const result = await sut.execute({
			name: qualifiedStaff.name,
			sector: qualifiedStaff.sector,
			education: qualifiedStaff.education,
			experience: qualifiedStaff.experience,
			employmentType: qualifiedStaff.employmentType.toString(),
			document: qualifiedStaff.document,
			isResponsible: qualifiedStaff.isResponsible,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryQualifiedStaffRepository.items[0]).toEqual(
			expect.objectContaining({
				name: qualifiedStaff.name,
				sector: qualifiedStaff.sector,
				education: qualifiedStaff.education,
				experience: qualifiedStaff.experience,
				employmentType: qualifiedStaff.employmentType,
				document: qualifiedStaff.document,
				isResponsible: qualifiedStaff.isResponsible,
			})
		);
	});
});

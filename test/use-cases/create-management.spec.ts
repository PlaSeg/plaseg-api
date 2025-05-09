import { InMemoryManagementRepository } from "../repositories/in-memory-management-repository";
import { InMemoryMunicipalitiesRepository } from "../repositories/in-memory-municipalities-repository";
import { CreateManagementUseCase } from "../../src/domain/use-cases/create-management";
import { makeManagement } from "../factories/make-management";
import { makeMunicipality } from "../factories/make-municipality";

let inMemoryManagementRepository: InMemoryManagementRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateManagementUseCase;

describe("Create Management Use Case", () => {
	beforeEach(() => {
		inMemoryManagementRepository = new InMemoryManagementRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateManagementUseCase(
			inMemoryManagementRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a management", async () => {
		const municipality = makeMunicipality();
		await inMemoryMunicipalitiesRepository.create(municipality);

		const management = makeManagement();

		const result = await sut.execute({
			initialDate: management.initialDate,
			endDate: management.endDate,
			managerName: management.managerName,
			managerCpf: management.managerCpf,
			managerEmail: management.managerEmail.toString(),
			managerAddress: management.managerAddress,
			managerPhone: management.managerPhone,
			adminManagerName: management.adminManagerName,
			adminManagerCpf: management.adminManagerCpf,
			adminManagerEmail: management.adminManagerEmail.toString(),
			adminManagerAddress: management.adminManagerAddress,
			adminManagerPhone: management.adminManagerPhone,
			legislationName: management.legislationName,
			legislationCpf: management.legislationCpf,
			legislationEmail: management.legislationEmail.toString(),
			legislationAddress: management.legislationAddress,
			legislationPhone: management.legislationPhone,
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryManagementRepository.items[0]).toEqual(
			expect.objectContaining({
				initialDate: management.initialDate,
				endDate: management.endDate,
				managerName: management.managerName,
				managerCpf: management.managerCpf,
				managerEmail: management.managerEmail,
				managerAddress: management.managerAddress,
				managerPhone: management.managerPhone,
				adminManagerName: management.adminManagerName,
				adminManagerCpf: management.adminManagerCpf,
				adminManagerEmail: management.adminManagerEmail,
				adminManagerAddress: management.adminManagerAddress,
				adminManagerPhone: management.adminManagerPhone,
				legislationName: management.legislationName,
				legislationCpf: management.legislationCpf,
				legislationEmail: management.legislationEmail,
				legislationAddress: management.legislationAddress,
				legislationPhone: management.legislationPhone,
			})
		);
	});
});

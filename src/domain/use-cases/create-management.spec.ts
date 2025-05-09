import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryManagementsRepository } from "../../../test/repositories/in-memory-managements-repository";
import { InMemoryMunicipalitiesRepository } from "../../../test/repositories/in-memory-municipalities-repository";
import { CreateManagementUseCase } from "./create-management";
import { makeManagement } from "../../../test/factories/make-management";
import { makeMunicipality } from "../../../test/factories/make-municipality";

let inMemoryManagementsRepository: InMemoryManagementsRepository;
let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateManagementUseCase;

describe("Create Management Use Case", () => {
	beforeEach(() => {
		inMemoryManagementsRepository = new InMemoryManagementsRepository();
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateManagementUseCase(
			inMemoryManagementsRepository,
			inMemoryMunicipalitiesRepository
		);
	});

	it("should be able to create a new management", async () => {
		const municipality = makeMunicipality();
		const management = makeManagement();

		await inMemoryMunicipalitiesRepository.create(municipality);

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

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryManagementsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a management without municipality", async () => {
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
			userId: "non-existent-user",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(404);
			expect(result.value.message).toEqual(
				"Cadastre um município antes de cadastrar uma gestão!"
			);
		}
		expect(inMemoryManagementsRepository.items).toHaveLength(0);
	});
});

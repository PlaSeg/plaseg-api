import { InMemoryMunicipalitiesRepository } from "../repositories/in-memory-municipalities-repository";
import { CreateMunicipalityUseCase } from "../../src/domain/use-cases/create-municipality";
import { makeMunicipality } from "../factories/make-municipality";

let inMemoryMunicipalitiesRepository: InMemoryMunicipalitiesRepository;
let sut: CreateMunicipalityUseCase;

describe("Create Municipality Use Case", () => {
	beforeEach(() => {
		inMemoryMunicipalitiesRepository = new InMemoryMunicipalitiesRepository();
		sut = new CreateMunicipalityUseCase(inMemoryMunicipalitiesRepository);
	});

	it("should be able to create a new municipality", async () => {
		const municipality = makeMunicipality();
		const result = await sut.execute({
			name: municipality.name,
			guardInitialDate: municipality.guardInitialDate,
			guardCount: municipality.guardCount,
			trafficInitialDate: municipality.trafficInitialDate,
			trafficCount: municipality.trafficCount,
			federativeUnit: municipality.federativeUnit,
			unitType: municipality.unitType.toString(),
			userId: municipality.userId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(1);
		expect(inMemoryMunicipalitiesRepository.items[0]).toEqual(
			expect.objectContaining({
				name: municipality.name,
				guardInitialDate: municipality.guardInitialDate,
				guardCount: municipality.guardCount,
				trafficInitialDate: municipality.trafficInitialDate,
				trafficCount: municipality.trafficCount,
				federativeUnit: municipality.federativeUnit,
				unitType: municipality.unitType,
				userId: municipality.userId,
			})
		);
	});

	it("should not be able to create a municipality with existing user", async () => {
		const existingMunicipality = makeMunicipality({
			userId: "user-1",
		});
		const newMunicipality = makeMunicipality({
			userId: "user-1",
		});

		await inMemoryMunicipalitiesRepository.create(existingMunicipality);

		const result = await sut.execute({
			name: newMunicipality.name,
			guardInitialDate: newMunicipality.guardInitialDate,
			guardCount: newMunicipality.guardCount,
			trafficInitialDate: newMunicipality.trafficInitialDate,
			trafficCount: newMunicipality.trafficCount,
			federativeUnit: newMunicipality.federativeUnit,
			unitType: newMunicipality.unitType.toString(),
			userId: newMunicipality.userId.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toEqual(409);
			expect(result.value.message).toEqual(
				"Município já cadastrado para esse usuário!"
			);
		}
		expect(inMemoryMunicipalitiesRepository.items).toHaveLength(1);
	});
});

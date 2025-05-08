import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Municipality } from "../entities/municipality";
import { UnitType } from "../entities/value-objects/unit-type";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";

type CreateMunicipalityUseCaseRequest = {
    name: string;
    guardInitialDate: Date;
    guardCount: number;
    trafficInitialDate: Date;
    trafficCount: number;
    federativeUnit: string;
    unitType: string;
    userId: string;
};

type CreateMunicipalityUseCaseResponse = Either<CustomError, null>;

export class CreateMunicipalityUseCase {
	constructor(private municipalitiesRepository: MunicipalitiesRepository
    ) {}

	async execute(
		data: CreateMunicipalityUseCaseRequest
	): Promise<CreateMunicipalityUseCaseResponse> {

		const doesMunicipalityAlreadyExist =
			await this.municipalitiesRepository.findByUserId(data.userId);

		if (doesMunicipalityAlreadyExist) {
			return left(new CustomError(409, "Município já cadastrado para esse usuário!"));
		}

		const municipality = Municipality.create({
			...data,
            unitType: UnitType.create(data.unitType)
		});

		await this.municipalitiesRepository.create(municipality)

		return right(null);
	}
}
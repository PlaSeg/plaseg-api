import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { MaintenanceContract } from "../entities/maintenance-contract";
import { MaintenanceContractsRepository } from "../repositories/maintenance-contracts-repository";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";

type CreateMaintenanceContractUseCaseRequest = {
	description: string;
	attachment: string;
	userId: string;
};

type CreateMaintenanceContractUseCaseResponse = Either<CustomError, null>;

export class CreateMaintenanceContractUseCase {
	constructor(
		private maintenanceContractsRepository: MaintenanceContractsRepository,
		private municipalitiesRepository: MunicipalitiesRepository
	) {}

	async execute(
		data: CreateMaintenanceContractUseCaseRequest
	): Promise<CreateMaintenanceContractUseCaseResponse> {
		const municipality = await this.municipalitiesRepository.findByUserId(
			data.userId
		);

		if (!municipality) {
			return left(
				new CustomError(
					404,
					"Cadastre um município antes de cadastrar um contrato de manutenção!"
				)
			);
		}

		const maintenanceContract = MaintenanceContract.create({
			...data,
			municipalityId: municipality.id.toString(),
		});

		await this.maintenanceContractsRepository.create(maintenanceContract);


		return right(null);
	}
}

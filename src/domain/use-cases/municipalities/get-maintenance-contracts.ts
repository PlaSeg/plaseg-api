import { Either, left, right } from "../../../core/types/either";
import { MunicipalitiesRepository } from "../../repositories/municipalities-repository";
import { CustomError } from "../../../core/errors/custom-error";
import { MaintenanceContract } from "../../entities/maintenance-contract";


type GetMaintenanceContractsUseCaseResponse = Either<
    CustomError,
    {
        maintenanceContracts: MaintenanceContract[];
    }
>;

export class GetMaintenanceContractsUseCase {
	constructor(private municipalitiesRepository: MunicipalitiesRepository) {}

	async execute({ userId }): Promise<GetMaintenanceContractsUseCaseResponse> {
		const municipality = await this.municipalitiesRepository.findByUserId(
			userId
		);

		if (!municipality) {
			return left(
				new CustomError(400, "É necessário ter um município cadastrado.")
			);
		}

		const maintenanceContracts =
			await this.municipalitiesRepository.findMaintenanceContracts(
				municipality.id.toString()
			);

		return right({ maintenanceContracts });
	}
}

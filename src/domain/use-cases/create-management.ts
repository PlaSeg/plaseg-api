import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Management } from "../entities/management";
import { Email } from "../entities/value-objects/email";
import { ManagementsRepository } from "../repositories/managements-repository";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";

type CreateManagementUseCaseRequest = {
	initialDate: Date;
	endDate: Date;

	managerName: string;
	managerCpf: string;
	managerEmail: string;
	managerAddress: string;
	managerPhone: string;

	adminManagerName: string;
	adminManagerCpf: string;
	adminManagerEmail: string;
	adminManagerAddress: string;
	adminManagerPhone: string;

	legislationName: string;
	legislationCpf: string;
	legislationEmail: string;
	legislationAddress: string;
	legislationPhone: string;

	userId: string;
};

type CreateManagementUseCaseResponse = Either<CustomError, null>;

export class CreateManagementUseCase {
	constructor(
		private managementsRepository: ManagementsRepository,
		private municipalitiesRepository: MunicipalitiesRepository
	) {}

	async execute(
		data: CreateManagementUseCaseRequest
	): Promise<CreateManagementUseCaseResponse> {
		const municipality = await this.municipalitiesRepository.findByUserId(
			data.userId
		);

		if (!municipality) {
			return left(
				new CustomError(
					404,
					"Cadastre um município antes de cadastrar uma gestão!"
				)
			);
		}

		const management = Management.create({
            ...data,
            managerEmail: Email.create(data.managerEmail),
            adminManagerEmail: Email.create(data.adminManagerEmail),
            legislationEmail: Email.create(data.legislationEmail),
			municipalityId: municipality.id.toString(),
		});

		await this.managementsRepository.create(management);

		return right(null);
	}
}

import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { ProjectPartnership } from "../entities/project-partnership";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";
import { ProjectPartnershipsRepository } from "../repositories/project-partnerships-repository";

type CreateProjectPartnershipUseCaseRequest = {
	term: string;
	agency: string;
	objective: string;
	status: string;
	userId: string;
};

type CreateProjectPartnershipUseCaseResponse = Either<CustomError, null>;

export class CreateProjectPartnershipUseCase {
	constructor(
		private projectPartnershipsRepository: ProjectPartnershipsRepository,
		private municipalityRepository: MunicipalitiesRepository
	) {}

	async execute(
		data: CreateProjectPartnershipUseCaseRequest
	): Promise<CreateProjectPartnershipUseCaseResponse> {
		const existingPartnership =
			await this.projectPartnershipsRepository.findByTerm(data.term);

		if (existingPartnership) {
			return left(
				new CustomError(409, "Parceria com esse termo já cadastrada!")
			);
		}

		const municipality = await this.municipalityRepository.findByUserId(
			data.userId
		);

		if (!municipality) {
			return left(
				new CustomError(
					404,
					"Cadastre um município antes de cadastrar uma parceria de projeto!"
				)
			);
		}

		const projectPartnership = ProjectPartnership.create({
			...data,
			municipalityId: municipality.id.toString(),
		});

		await this.projectPartnershipsRepository.create(projectPartnership);

		return right(null);
	}
}

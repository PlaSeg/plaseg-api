import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { AllocationDepartment } from "../entities/allocation-department";
import { AllocationDeparmentsRepository } from "../repositories/allocation-department";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";

type CreateAllocationDepartmentUseCaseRequest = {
	description: string;
	address: string;
	userId: string;
};

type CreateAllocationDepartmentUseCaseResponse = Either<CustomError, null>;

export class CreateAllocationDepartmentUseCase {
	constructor(
		private allocationDepartmentsRepository: AllocationDeparmentsRepository,
		private municipalitiesRepository: MunicipalitiesRepository
	) {}

	async execute(
		data: CreateAllocationDepartmentUseCaseRequest
	): Promise<CreateAllocationDepartmentUseCaseResponse> {
		const municipality = await this.municipalitiesRepository.findByUserId(
			data.userId
		);

		if (!municipality) {
			return left(
				new CustomError(
					404,
					"Cadastre um município antes de cadastrar um setor de alocação!"
				)
			);
		}

		const allocationDepartment = AllocationDepartment.create({
			description: data.description,
			address: data.address,
			municipalityId: municipality.id.toString(),
		});

		await this.allocationDepartmentsRepository.create(allocationDepartment);

		return right(null);
	}
}

import { Either, left, right } from "../../../core/types/either";
import { AllocationDepartment } from "../../entities/allocation-department";
import { MunicipalitiesRepository } from "../../repositories/municipalities-repository";
import { CustomError } from "../../../core/errors/custom-error";


type GetAllocationDepartmentsUseCaseResponse = Either<
	CustomError,
	{
		allocationDepartments: AllocationDepartment[];
	}
>;

export class GetAllocationDepartmentsUseCase {
	constructor(private municipalitiesRepository: MunicipalitiesRepository) {}

    async execute({ userId }): Promise<GetAllocationDepartmentsUseCaseResponse> {
        const municipality = await this.municipalitiesRepository.findByUserId(userId);

        if (!municipality) {
            return left(new CustomError(400, "É necessário ter um município cadastrado."))
        }

        const allocationDepartments = await this.municipalitiesRepository.findAllocationDepartments(municipality.id.toString())

		return right({ allocationDepartments });
	}
}

import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { ProjectType } from "../../entities/project-type";
import { ProjectTypesRepository } from "../../repositories/project-type-repository";

type GetProjectTypeByIdUseCaseRequest = {
	id: string;
};

type GetProjectTypeByIdUseCaseResponse = Either<
    CustomError,
    {
        projectType: ProjectType;
    }
>;

export class GetProjectTypeByIdUseCase {
	constructor(private projectTypeRepository: ProjectTypesRepository) {}

	async execute({
		id,
	}: GetProjectTypeByIdUseCaseRequest): Promise<GetProjectTypeByIdUseCaseResponse> {
		const projectType = await this.projectTypeRepository.findById(id);

		if (!projectType) {
			return left(new CustomError(404, "Tipo de projeto não encontrado."))
		}

		return right({ projectType: projectType });
	}
}

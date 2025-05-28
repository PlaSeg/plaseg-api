import { Either, right } from "../../../core/types/either";
import { ProjectType } from "../../entities/project-type";
import { ProjectTypesRepository } from "../../repositories/project-type-repository";

type GetProjectTypesUseCaseResponse = Either<
    null,
    {
        projectTypes: ProjectType[];
    }
>;

export class GetProjectTypesUseCase {
	constructor(private projectTypeRepository: ProjectTypesRepository) {}

	async execute(): Promise<GetProjectTypesUseCaseResponse> {
		const projectTypes = await this.projectTypeRepository.findMany();

		return right({ projectTypes: projectTypes });
	}
}

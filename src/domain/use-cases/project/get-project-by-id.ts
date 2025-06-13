import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Project } from "../../entities/project";
import { ProjectsRepository } from "../../repositories/project-repository";

type GetProjectByIdUseCaseResponse = Either<
    CustomError,
    {
        project: Project;
    }
>;

export class GetProjectByIdUseCase {
	constructor(
		private projectsRepository: ProjectsRepository
	) {}

	async execute({ projectId }): Promise<GetProjectByIdUseCaseResponse> {

		const project = await this.projectsRepository.findById(
			projectId
        );
        
        if (!project) {
            return left(new CustomError(400, "Não existe um projeto com esse id."))
        }

		return right({ project });
	}
}

import { Either, right } from "../../../core/types/either";
import { Project } from "../../entities/project";
import { ProjectsRepository } from "../../repositories/project-repository";

type GetProjectsUseCaseResponse = Either<
    null,
    {
        projects: Project[];
    }
>;

export class GetProjectsUseCase {
	constructor(private projectsRespository: ProjectsRepository) {}

	async execute(): Promise<GetProjectsUseCaseResponse> {
		const projects = await this.projectsRespository.findMany();

		return right({ projects });
	}
}

import { Either, right } from "../../../core/types/either";
import { ProjectType } from "../../entities/project-type";
import { ProjectTypesRepository } from "../../repositories/project-type-repository";

type GetProjectTypesByOpportunityIdUseCaseResponse = Either<
	null,
	{
		projectTypes: ProjectType[];
	}
>;

export class GetProjectTypesByOpportunityIdUseCase {
	constructor(private projectTypesRepository: ProjectTypesRepository) {}

	async execute(
		opportunityId: string
	): Promise<GetProjectTypesByOpportunityIdUseCaseResponse> {
		const projectTypes = await this.projectTypesRepository.findByOpportunityId(
			opportunityId
		);

		return right({ projectTypes });
	}
}

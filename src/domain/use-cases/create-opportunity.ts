import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Opportunity } from "../entities/opportunity";
import { OpportunitiesRepository } from "../repositories/opportunities-repositories";

type CreateOpportunityUseCaseRequest = {
	title: string;
	description: string;
	availableValue: number;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage: number;
};

type CreateOpportunityUseCaseResponse = Either<
	CustomError,
	{ opportunity: Opportunity }
>;

export class CreateOpportunityUseCase {
	constructor(private opportunityRepository: OpportunitiesRepository) {}

	async execute(
		request: CreateOpportunityUseCaseRequest
	): Promise<CreateOpportunityUseCaseResponse> {
		const doesOpportunityAlreadyExist =
			await this.opportunityRepository.findByTitle(request.title);

		if (doesOpportunityAlreadyExist) {
			return left(new CustomError(409, "Título já cadastrado"));
		}

		const opportunity = Opportunity.create({
			...request,
		});

		await this.opportunityRepository.create(opportunity);

		return right({
			opportunity,
		});
	}
}

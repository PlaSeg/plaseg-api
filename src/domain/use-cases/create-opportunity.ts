import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Opportunity } from "../entities/opportunity";
import { OportunitiesRepository } from "../repositories/opportunities-repositories";

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

type CreateOpportunityUseCaseResponse = Either<CustomError, null>;

export class CreateOpportunityUseCase {
	constructor(private opportunityRepository: OportunitiesRepository) {}

	async execute(
		data: CreateOpportunityUseCaseRequest
	): Promise<CreateOpportunityUseCaseResponse> {
		const doesOpportunityAlreadyExist =
			await this.opportunityRepository.findByTitle(data.title);

		if (doesOpportunityAlreadyExist) {
			return left(new CustomError(409, "Título já cadastrado"));
		}

		const opportunity = Opportunity.create({
			...data,
		});

		await this.opportunityRepository.create(opportunity);

		return right(null);
	}
}

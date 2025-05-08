import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Opportunity } from "../entities/opportunity";
import { OpportunitiesRepository } from "../repositories/opportunities-repositories";
import { RequiredDocument } from "../entities/required-document";

type RequiredDocumentRequest = {
	name: string;
	description: string;
	model: string;
};

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
	requiredDocuments: RequiredDocumentRequest[];
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

		const requiredDocuments = request.requiredDocuments.map((document) =>
			RequiredDocument.create({
				name: document.name,
				description: document.description,
				model: document.model,
			})
		);

		const opportunity = Opportunity.create({
			...request,
			requiredDocuments,
		});

		await this.opportunityRepository.create(opportunity);

		return right({
			opportunity,
		});
	}
}

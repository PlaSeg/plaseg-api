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
	typeId: string;
	requiredDocuments: RequiredDocumentRequest[];
};

type CreateOpportunityUseCaseResponse = Either<
	CustomError,
	{
		opportunity: {
			id: string;
			title: string;
			description: string;
			availableValue: number;
			minValue: number;
			maxValue: number;
			initialDeadline: Date;
			finalDeadline: Date;
			requiresCounterpart: boolean;
			counterpartPercentage: number;
			typeId: string;
			createdAt: Date;
			updatedAt: Date | null;

			requiredDocuments: {
				id: string;
				name: string;
				description: string;
				model: string;
				createdAt: Date;
				updatedAt: Date | null;
			}[];
		};
	}
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
			opportunity: {
				id: opportunity.id.toString(),
				title: opportunity.title,
				description: opportunity.description,
				availableValue: opportunity.availableValue,
				minValue: opportunity.minValue,
				maxValue: opportunity.maxValue,
				initialDeadline: opportunity.initialDeadline,
				finalDeadline: opportunity.finalDeadline,
				requiresCounterpart: opportunity.requiresCounterpart,
				counterpartPercentage: opportunity.counterpartPercentage,
				typeId: opportunity.typeId,
				requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
					id: doc.id.toString(),
					name: doc.name,
					description: doc.description,
					model: doc.model,
					createdAt: doc.createdAt,
					updatedAt: doc.updatedAt ?? null,
				})),
				createdAt: opportunity.createdAt,
				updatedAt: opportunity.updatedAt ?? null,
			},
		});
	}
}

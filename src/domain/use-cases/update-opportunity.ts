import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { OpportunitiesRepository } from "../repositories/opportunities-repositories";
import { RequiredDocument } from "../entities/required-document";
import { Opportunity } from "../entities/opportunity";
import { getCurrentDate } from "../../core/utils/get-current-date";

type RequiredDocumentRequest = {
	id?: string;
	name?: string;
	description?: string;
	model?: string;
};

type UpdateOpportunityUseCaseRequest = {
	id: string;
	title?: string;
	description?: string;
	availableValue?: number;
	minValue?: number;
	maxValue?: number;
	initialDeadline?: Date;
	finalDeadline?: Date;
	requiresCounterpart?: boolean;
	counterpartPercentage?: number;
	isActive?: boolean;
	typeId?: string;
	requiredDocuments?: RequiredDocumentRequest[];
};

type RequiredDocumentResponse = {
	id: string;
	name: string;
	description: string;
	model: string;
	createdAt: Date;
	updatedAt: Date | null;
};

type OpportunityResponse = {
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
	isActive: boolean;
	typeId: string;
	createdAt: Date;
	updatedAt: Date | null;
	requiredDocuments: RequiredDocumentResponse[];
};

type UpdateOpportunityUseCaseResponse = Either<
	CustomError,
	{
		opportunity: OpportunityResponse;
	}
>;

export class UpdateOpportunityUseCase {
	constructor(private opportunitiesRepository: OpportunitiesRepository) {}

	async execute(
		request: UpdateOpportunityUseCaseRequest
	): Promise<UpdateOpportunityUseCaseResponse> {
		const opportunity = await this.opportunitiesRepository.findById(request.id);

		if (!opportunity) {
			return left(new CustomError(404, "Oportunidade não encontrada"));
		}

		if (request.title) {
			const doesOpportunityAlreadyExist =
				await this.opportunitiesRepository.findByTitle(request.title);

			if (
				doesOpportunityAlreadyExist &&
				doesOpportunityAlreadyExist.id.toString() !== opportunity.id.toString()
			) {
				return left(new CustomError(409, "Título já cadastrado"));
			}
		}

		const requiredDocuments = request.requiredDocuments
			? request.requiredDocuments.map((doc) => {
					const existingDoc = opportunity.requiredDocuments.find(
						(existing) => existing.id.toString() === doc.id
					);

					if (existingDoc) {
						return RequiredDocument.create(
							{
								name: doc.name ?? existingDoc.name,
								description: doc.description ?? existingDoc.description,
								model: doc.model ?? existingDoc.model,
							},
							existingDoc.id
						);
					}

					return RequiredDocument.create({
						name: doc.name ?? "",
						description: doc.description ?? "",
						model: doc.model ?? "",
					});
			  })
			: opportunity.requiredDocuments;

		const updatedOpportunity = Opportunity.create(
			{
				title: request.title ?? opportunity.title,
				description: request.description ?? opportunity.description,
				availableValue: request.availableValue ?? opportunity.availableValue,
				minValue: request.minValue ?? opportunity.minValue,
				maxValue: request.maxValue ?? opportunity.maxValue,
				initialDeadline: request.initialDeadline ?? opportunity.initialDeadline,
				finalDeadline: request.finalDeadline ?? opportunity.finalDeadline,
				requiresCounterpart:
					request.requiresCounterpart ?? opportunity.requiresCounterpart,
				counterpartPercentage:
					request.counterpartPercentage ?? opportunity.counterpartPercentage,
				isActive: request.isActive ?? opportunity.isActive,
				requiredDocuments,
				typeId: request.typeId ?? opportunity.typeId,
				createdAt: opportunity.createdAt,
				updatedAt: getCurrentDate(),
			},
			opportunity.id
		);

		await this.opportunitiesRepository.update(updatedOpportunity);

		return right({
			opportunity: {
				id: updatedOpportunity.id.toString(),
				title: updatedOpportunity.title,
				description: updatedOpportunity.description,
				availableValue: updatedOpportunity.availableValue,
				minValue: updatedOpportunity.minValue,
				maxValue: updatedOpportunity.maxValue,
				initialDeadline: updatedOpportunity.initialDeadline,
				finalDeadline: updatedOpportunity.finalDeadline,
				requiresCounterpart: updatedOpportunity.requiresCounterpart,
				counterpartPercentage: updatedOpportunity.counterpartPercentage,
				isActive: updatedOpportunity.isActive,
				typeId: updatedOpportunity.typeId,
				createdAt: updatedOpportunity.createdAt,
				updatedAt: updatedOpportunity.updatedAt ?? null,
				requiredDocuments: updatedOpportunity.requiredDocuments.map((doc) => ({
					id: doc.id.toString(),
					name: doc.name,
					description: doc.description,
					model: doc.model,
					createdAt: doc.createdAt,
					updatedAt: doc.updatedAt ?? null,
				})),
			},
		});
	}
}

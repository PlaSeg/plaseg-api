import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { OpportunitiesRepository } from "../repositories/opportunities-repository";
import { TypesRepository } from "../repositories/type-repository";

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
	typeDescription: string;
	createdAt: Date;
	updatedAt: Date | null;
	requiredDocuments: RequiredDocumentResponse[];
};

type GetOpportunityByIdUseCaseRequest = {
	opportunityId: string;
};

type GetOpportunityByIdUseCaseResponse = Either<
	CustomError,
	{
		opportunity: OpportunityResponse | null;
	}
>;

export class GetOpportunityByIdUseCase {
	constructor(
		private opportunitiesRepository: OpportunitiesRepository,
		private typesRepository: TypesRepository
	) {}

	async execute({
		opportunityId,
	}: GetOpportunityByIdUseCaseRequest): Promise<GetOpportunityByIdUseCaseResponse> {
		const opportunity = await this.opportunitiesRepository.findById(
			opportunityId
		);

		if (!opportunity) {
			return left(new CustomError(404, "Oportunidade não encontrada"));
		}

		const type = await this.typesRepository.findById(opportunity.typeId);

		const opportunityResponse: OpportunityResponse = {
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
			isActive: opportunity.isActive,
			typeDescription: type?.description ?? "Tipo não encontrado",
			createdAt: opportunity.createdAt,
			updatedAt: opportunity.updatedAt ?? null,
			requiredDocuments: opportunity.requiredDocuments.map((doc) => ({
				id: doc.id.toString(),
				name: doc.name,
				description: doc.description,
				model: doc.model,
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt ?? null,
			})),
		};

		return right({ opportunity: opportunityResponse });
	}
}

import { CustomError } from "../../core/errors/custom-error";
import { Either, right } from "../../core/types/either";
import { OpportunitiesRepository } from "../repositories/opportunities-repositories";

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
	createdAt: Date;
	updatedAt: Date | null;
	requiredDocuments: RequiredDocumentResponse[];
};

type GetOpportunitiesUseCaseResponse = Either<
	CustomError,
	{
		opportunities: OpportunityResponse[] | null;
	}
>;

export class GetOpportunitiesUseCase {
	constructor(private opportunitiesRespository: OpportunitiesRepository) {}

	async execute(): Promise<GetOpportunitiesUseCaseResponse> {
		const opportunities = await this.opportunitiesRespository.findMany();

		if (!opportunities) {
			return right({
				opportunities: null,
			});
		}

		const opportunitiesResponse = opportunities.map((opportunity) => ({
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
		}));

		return right({ opportunities: opportunitiesResponse });
	}
}

import { Prisma, Opportunity as PrismaOpportunity } from "@prisma/client";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export class PrismaOpportunityMapper {
	static toDomain(raw: PrismaOpportunity): Opportunity {
		return Opportunity.create(
			{
				title: raw.title,
				description: raw.description,
				availableValue: raw.availableValue.toNumber(),
				minValue: raw.minValue.toNumber(),
				maxValue: raw.maxValue.toNumber(),
				initialDeadline: raw.initialDeadline,
				finalDeadline: raw.finalDeadline,
				requiresCounterpart: raw.requiresCounterpart,
				counterpartPercentage: raw.counterpartPercentage.toNumber(),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		opportunity: Opportunity
	): Prisma.OpportunityUncheckedCreateInput {
		return {
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
		};
	}
}

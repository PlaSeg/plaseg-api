import { OpportunitiesRepository } from "../../../../domain/repositories/opportunities-repositories";
import { prisma } from "../prisma";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { PrismaOpportunityMapper } from "../mappers/prisma-opportunity-mapper";

export class PrismaOpportunitiesRepository implements OpportunitiesRepository {
	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				id,
			},
			include: {
				requiredDocuments: true,
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain(opportunity);
	}

	async findMany(): Promise<Opportunity[] | null> {
		const opportunities = await prisma.opportunity.findMany({
			include: {
				requiredDocuments: true,
			},
		});

		if (opportunities.length === 0) {
			return null;
		}

		return opportunities.map((opportunity) =>
			PrismaOpportunityMapper.toDomain(opportunity)
		);
	}

	async findByTitle(title: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				title,
			},
			include: {
				requiredDocuments: true,
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain(opportunity);
	}

	async create(opportunity: Opportunity): Promise<void> {
		const data = PrismaOpportunityMapper.toPrisma(opportunity);

		await prisma.opportunity.create({
			data,
		});
	}

	async update(opportunity: Opportunity): Promise<void> {
		const data = PrismaOpportunityMapper.toPrisma(opportunity);

		await prisma.opportunity.update({
			where: {
				id: opportunity.id.toString(),
			},
			data,
		});
	}
}

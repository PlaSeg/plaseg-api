import { Opportunity } from "../../../../domain/entities/opportunity";
import { OpportunitiesRepository } from "../../../../domain/repositories/opportunities-repositories";
import { PrismaOpportunityMapper } from "../mappers/prisma-opportunity-mapper";
import { prisma } from "../prisma";

export class PrismaOpportunitiesRepository implements OpportunitiesRepository {
	async findMany(): Promise<Opportunity[] | null> {
		const opportunities = await prisma.opportunity.findMany();

		if (!opportunities) {
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
		throw new Error("Method not implemented.");
	}
	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = await prisma.opportunity.findUnique({
			where: {
				id,
			},
		});

		if (!opportunity) {
			return null;
		}

		return PrismaOpportunityMapper.toDomain(opportunity);
	}
}

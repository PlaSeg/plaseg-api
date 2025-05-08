import { Opportunity } from "../../src/domain/entities/opportunity";
import { OpportunitiesRepository } from "../../src/domain/repositories/opportunities-repositories";

export class InMemoryOpportunitiesRepository
	implements OpportunitiesRepository
{
	public items: Opportunity[] = [];

	async findById(id: string): Promise<Opportunity | null> {
		const opportunity = this.items.find(
			(opportunity) => opportunity.id.toString() === id
		);

		if (!opportunity) {
			return null;
		}
		return opportunity;
	}

	async findMany(): Promise<Opportunity[] | null> {
		if (this.items.length === 0) {
			return null;
		}
		return this.items;
	}

	async findByTitle(title: string): Promise<Opportunity | null> {
		const opportunity = this.items.find(
			(opportunity) => opportunity.title === title
		);

		if (!opportunity) {
			return null;
		}
		return opportunity;
	}

	async create(opportunity: Opportunity): Promise<void> {
		this.items.push(opportunity);
	}

	async update(opportunity: Opportunity): Promise<void> {
		const opportunityIndex = this.items.findIndex(
			(op) => op.id.toString() === opportunity.id.toString()
		);

		if (opportunityIndex !== -1) {
			this.items[opportunityIndex] = opportunity;
		}
	}
}

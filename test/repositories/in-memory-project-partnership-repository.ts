import { ProjectPartnership } from "../../src/domain/entities/project-partnership";
import { ProjectPartnershipRepository } from "../../src/domain/repositories/project-partnership-repository";

export class InMemoryProjectPartnershipRepository
	implements ProjectPartnershipRepository
{
	public items: ProjectPartnership[] = [];

	async create(projectPartnership: ProjectPartnership): Promise<void> {
		this.items.push(projectPartnership);
	}

	async findById(id: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find(
			(item) => item.id.toString() === id
		);

		if (!projectPartnership) {
			return null;
		}

		return projectPartnership;
	}

	async findByTerm(term: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find((item) => item.term === term);

		if (!projectPartnership) {
			return null;
		}

		return projectPartnership;
	}

	async findByAgency(agency: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find(
			(item) => item.agency === agency
		);

		if (!projectPartnership) {
			return null;
		}

		return projectPartnership;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<ProjectPartnership[] | null> {
		const projectPartnerships = this.items.filter(
			(item) => item.municipalityId.toString() === municipalityId
		);

		if (!projectPartnerships.length) {
			return null;
		}

		return projectPartnerships;
	}
}

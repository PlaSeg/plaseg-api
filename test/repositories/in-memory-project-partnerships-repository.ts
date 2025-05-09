import { ProjectPartnershipsRepository } from "../../src/domain/repositories/project-partnerships-repository";
import { ProjectPartnership } from "../../src/domain/entities/project-partnership";

export class InMemoryProjectPartnershipsRepository
	implements ProjectPartnershipsRepository
{
	public items: ProjectPartnership[] = [];

	async findById(id: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find(
			(partnership) => partnership.id.toString() === id
		);

		if (!projectPartnership) {
			return null;
		}

		return projectPartnership;
	}

	async findByTerm(term: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find(
			(partnership) => partnership.term === term
		);

		if (!projectPartnership) {
			return null;
		}

		return projectPartnership;
	}

	async findByAgency(agency: string): Promise<ProjectPartnership | null> {
		const projectPartnership = this.items.find(
			(partnership) => partnership.agency === agency
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
			(partnership) => partnership.municipalityId === municipalityId
		);

		if (!projectPartnerships.length) {
			return null;
		}

		return projectPartnerships;
	}

	async create(projectPartnership: ProjectPartnership): Promise<void> {
		this.items.push(projectPartnership);
	}
}

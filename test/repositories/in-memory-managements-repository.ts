import { ManagementsRepository } from "../../src/domain/repositories/managements-repository";
import { Management } from "../../src/domain/entities/management";

export class InMemoryManagementsRepository implements ManagementsRepository {
	public items: Management[] = [];

	async findById(id: string): Promise<Management | null> {
		const management = this.items.find(
			(management) => management.id.toString() === id
		);

		if (!management) {
			return null;
		}

		return management;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<Management[] | null> {
		const managements = this.items.filter(
			(management) => management.municipalityId === municipalityId
		);

		if (!managements.length) {
			return null;
		}

		return managements;
	}

	async create(management: Management): Promise<void> {
		this.items.push(management);
	}
}

import { Management } from "../../src/domain/entities/management";
import { ManagementRepository } from "../../src/domain/repositories/management-repository";

export class InMemoryManagementRepository implements ManagementRepository {
	public items: Management[] = [];

	async create(management: Management): Promise<void> {
		this.items.push(management);
	}

	async findById(id: string): Promise<Management | null> {
		const management = this.items.find((item) => item.id.toString() === id);

		if (!management) {
			return null;
		}

		return management;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<Management[] | null> {
		const managements = this.items.filter(
			(item) => item.municipalityId.toString() === municipalityId
		);

		if (!managements.length) {
			return null;
		}

		return managements;
	}
}

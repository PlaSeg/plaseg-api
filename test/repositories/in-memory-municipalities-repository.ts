import { Municipality } from "../../src/domain/entities/municipality";
import { MunicipalitiesRepository } from "../../src/domain/repositories/municipalities-repository";

export class InMemoryMunicipalitiesRepository
	implements MunicipalitiesRepository
{
	public items: Municipality[] = [];

	async findById(id: string): Promise<Municipality | null> {
		const municipality = this.items.find((m) => m.id.toString() === id);
		return municipality ?? null;
	}

	async findByName(name: string): Promise<Municipality | null> {
		const municipality = this.items.find((m) => m.name === name);
		return municipality ?? null;
	}

	async findByUserId(userId: string): Promise<Municipality | null> {
		const municipality = this.items.find((m) => m.userId === userId);
		return municipality ?? null;
	}

	async create(municipality: Municipality): Promise<void> {
		this.items.push(municipality);
	}
}

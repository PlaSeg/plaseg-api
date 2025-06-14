import { Municipality } from "../../src/domain/entities/municipality";
import { AllocationDepartment } from "../../src/domain/entities/allocation-department";
import { MunicipalitiesRepository } from "../../src/domain/repositories/municipalities-repository";

export class InMemoryMunicipalitiesRepository
	implements MunicipalitiesRepository
{
	public items: Municipality[] = [];

	async findById(id: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.id.toString() === id
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async findByName(name: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.name === name
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async findByUserId(userId: string): Promise<Municipality | null> {
		const municipality = this.items.find(
			(municipality) => municipality.userId.toString() === userId
		);

		if (!municipality) {
			return null;
		}

		return municipality;
	}

	async findAllocationDepartments(
		municipalityId: string
	): Promise<AllocationDepartment[]> {
		const municipality = this.items.find(
			(municipality) => municipality.id.toString() === municipalityId
		);

		if (!municipality) {
			return [];
		}
		
		return municipality.allocationDepartments || [];
	}

	async create(municipality: Municipality): Promise<void> {
		this.items.push(municipality);
	}
}

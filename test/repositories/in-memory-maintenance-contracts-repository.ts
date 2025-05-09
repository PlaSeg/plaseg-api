import { MaintenanceContractsRepository } from "../../src/domain/repositories/maintenance-contracts-repository";
import { MaintenanceContract } from "../../src/domain/entities/maintenance-contract";

export class InMemoryMaintenanceContractsRepository
	implements MaintenanceContractsRepository
{
	public items: MaintenanceContract[] = [];

	async findById(id: string): Promise<MaintenanceContract | null> {
		const maintenanceContract = this.items.find(
			(contract) => contract.id.toString() === id
		);

		if (!maintenanceContract) {
			return null;
		}

		return maintenanceContract;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<MaintenanceContract[] | null> {
		const maintenanceContracts = this.items.filter(
			(contract) => contract.municipalityId === municipalityId
		);

		if (!maintenanceContracts.length) {
			return null;
		}

		return maintenanceContracts;
	}

	async create(maintenanceContract: MaintenanceContract): Promise<void> {
		this.items.push(maintenanceContract);
	}
}

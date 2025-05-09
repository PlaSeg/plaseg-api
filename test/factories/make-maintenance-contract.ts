import {
	MaintenanceContract,
	MaintenanceContractProps,
} from "../../src/domain/entities/maintenance-contract";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeMaintenanceContract(
	override: Partial<MaintenanceContractProps> = {}
) {
	const maintenanceContract = MaintenanceContract.create({
		description: "Maintenance contract for city infrastructure",
		attachment: "contract.pdf",
		municipalityId: new UniqueEntityID().toString(),
		...override,
	});

	return maintenanceContract;
}

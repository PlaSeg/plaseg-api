import { MaintenanceContract } from "../../src/domain/entities/maintenance-contract";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeMaintenanceContract(
	override: Partial<MaintenanceContract> = {},
	id?: UniqueEntityID
) {
	const maintenanceContract = MaintenanceContract.create(
		{
			description: "Test Contract",
			attachment: "test-attachment.pdf",
			...override,
		},
		id
	);

	return maintenanceContract;
}

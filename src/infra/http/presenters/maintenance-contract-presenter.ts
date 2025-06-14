import { MaintenanceContract } from "../../../domain/entities/maintenance-contract";
import { MaintenanceContractResponse } from "../schemas/maintenance-contracts";

export class MaintenanceContractPresenter {
	static toHTTP(
		maintenanceContract: MaintenanceContract
	): MaintenanceContractResponse {
		return {
			id: maintenanceContract.id.toString(),
			description: maintenanceContract.description,
			attachment: maintenanceContract.attachment,
			createdAt: maintenanceContract.createdAt,
			updatedAt: maintenanceContract.updatedAt ?? null,
		};
	}
}

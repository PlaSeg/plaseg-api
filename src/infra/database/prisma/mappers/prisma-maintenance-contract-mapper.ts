import {
	Prisma,
	MaintenanceContract as PrismaMaintenanceContract,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { MaintenanceContract } from "../../../../domain/entities/maintenance-contract";

export class PrismaMaintenanceContractMapper {
	static toDomain(raw: PrismaMaintenanceContract): MaintenanceContract {
		return MaintenanceContract.create(
			{
				description: raw.description,
				attachment: raw.attachment,
				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		maintenanceContract: MaintenanceContract
	): Prisma.MaintenanceContractUncheckedCreateInput {
		return {
			id: maintenanceContract.id.toString(),
			description: maintenanceContract.description,
			attachment: maintenanceContract.attachment,
			municipalityId: maintenanceContract.municipalityId,
			createdAt: maintenanceContract.createdAt,
			updatedAt: maintenanceContract.updatedAt,
		};
	}
}

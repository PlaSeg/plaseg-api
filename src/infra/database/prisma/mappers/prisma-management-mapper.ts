import { Prisma, Management as PrismaManagement } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Management } from "../../../../domain/entities/management";
import { Email } from "../../../../domain/entities/value-objects/email";

export class PrismaManagementMapper {
	static toDomain(raw: PrismaManagement): Management {
		return Management.create(
			{
				initialDate: raw.initialDate,
				endDate: raw.endDate,

				managerName: raw.managerName,
				managerCpf: raw.managerCpf,
				managerEmail: Email.create(raw.managerEmail),
				managerAddress: raw.managerAddress,
				managerPhone: raw.managerPhone,

				adminManagerName: raw.adminManagerName,
				adminManagerCpf: raw.adminManagerCpf,
				adminManagerEmail: Email.create(raw.adminManagerEmail),
				adminManagerAddress: raw.adminManagerAddress,
				adminManagerPhone: raw.adminManagerPhone,

				legislationName: raw.legislationName,
				legislationCpf: raw.legislationCpf,
				legislationEmail: Email.create(raw.legislationEmail),
				legislationAddress: raw.legislationAddress,
				legislationPhone: raw.legislationPhone,

				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		management: Management
	): Prisma.ManagementUncheckedCreateInput {
		return {
			id: management.id.toString(),
			initialDate: management.initialDate,
			endDate: management.endDate,

			managerName: management.managerName,
			managerCpf: management.managerCpf,
			managerEmail: management.managerEmail.toString(),
			managerAddress: management.managerAddress,
			managerPhone: management.managerPhone,

			adminManagerName: management.adminManagerName,
			adminManagerCpf: management.adminManagerCpf,
			adminManagerEmail: management.adminManagerEmail.toString(),
			adminManagerAddress: management.adminManagerAddress,
			adminManagerPhone: management.adminManagerPhone,

			legislationName: management.legislationName,
			legislationCpf: management.legislationCpf,
			legislationEmail: management.legislationEmail.toString(),
			legislationAddress: management.legislationAddress,
			legislationPhone: management.legislationPhone,

			municipalityId: management.municipalityId,
			createdAt: management.createdAt,
			updatedAt: management.updatedAt,
		};
	}
}

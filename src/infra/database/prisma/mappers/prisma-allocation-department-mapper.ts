import {
	Prisma,
	AllocationDepartment as PrismaAllocationDepartment,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { AllocationDepartment } from "../../../../domain/entities/allocation-department";

export class PrismaAllocationDepartmentMapper {
	static toDomain(raw: PrismaAllocationDepartment): AllocationDepartment {
		return AllocationDepartment.create(
			{
				description: raw.description,
				address: raw.address,
				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		allocationDepartment: AllocationDepartment
	): Prisma.AllocationDepartmentUncheckedCreateInput {
		return {
			id: allocationDepartment.id.toString(),
			description: allocationDepartment.description,
			address: allocationDepartment.address,
			municipalityId: allocationDepartment.municipalityId,
			createdAt: allocationDepartment.createdAt,
			updatedAt: allocationDepartment.updatedAt,
		};
	}
}

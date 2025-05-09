import { Prisma, QualifiedStaff as PrismaQualifiedStaff } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { QualifiedStaff } from "../../../../domain/entities/qualified-staff";
import { EmploymentType } from "../../../../domain/entities/value-objects/employment-type";

export class PrismaQualifiedStaffMapper {
	static toDomain(raw: PrismaQualifiedStaff): QualifiedStaff {
		return QualifiedStaff.create(
			{
				name: raw.name,
				sector: raw.sector,
				education: raw.education,
				experience: raw.experience,
				employmentType: EmploymentType.create(raw.employmentType),
				document: raw.document,
				isResponsible: raw.isResponsible,
				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		qualifiedStaff: QualifiedStaff
	): Prisma.QualifiedStaffUncheckedCreateInput {
		return {
			id: qualifiedStaff.id.toString(),
			name: qualifiedStaff.name,
			sector: qualifiedStaff.sector,
			education: qualifiedStaff.education,
			experience: qualifiedStaff.experience,
			employmentType: qualifiedStaff.employmentType.toPrisma(),
			document: qualifiedStaff.document,
			isResponsible: qualifiedStaff.isResponsible,
			municipalityId: qualifiedStaff.municipalityId,
			createdAt: qualifiedStaff.createdAt,
			updatedAt: qualifiedStaff.updatedAt,
		};
	}
}

import {
	Prisma,
	ProjectPartnership as PrismaProjectPartnership,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { ProjectPartnership } from "../../../../domain/entities/project-partnership";

export class PrismaProjectPartnershipMapper {
	static toDomain(raw: PrismaProjectPartnership): ProjectPartnership {
		return ProjectPartnership.create(
			{
				term: raw.term,
				agency: raw.agency,
				objective: raw.objective,
				status: raw.status,
				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		projectPartnership: ProjectPartnership
	): Prisma.ProjectPartnershipUncheckedCreateInput {
		return {
			id: projectPartnership.id.toString(),
			term: projectPartnership.term,
			agency: projectPartnership.agency,
			objective: projectPartnership.objective,
			status: projectPartnership.status,
			municipalityId: projectPartnership.municipalityId,
			createdAt: projectPartnership.createdAt,
			updatedAt: projectPartnership.updatedAt,
		};
	}
}

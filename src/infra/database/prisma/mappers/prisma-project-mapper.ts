import {
	Prisma,
	Project as PrismaProject,
	Document as PrismaDocument,
	Field as PrismaField,
	RequestedItem as PrismaRequestedItem,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Project } from "../../../../domain/entities/project";
import { PrismaDocumentMapper } from "./prisma-document-mapper";
import { PrismaRequestedItemMapper } from "./prisma-requested-item-mapper";

export class PrismaProjectMapper {
	static toDomain(
		raw: PrismaProject & {
			documents: (PrismaDocument & { fields: PrismaField[] })[];
			requestedItems: PrismaRequestedItem[];
		}
	): Project {
		return Project.create(
			{
				title: raw.title,
				documents: raw.documents.map(PrismaDocumentMapper.toDomain),
				opportunityId: raw.opportunityId,
				projectTypeId: raw.projectTypeId,
				municipalityId: raw.municipalityId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				requestedItems: raw.requestedItems.map(
					PrismaRequestedItemMapper.toDomain
				),
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		project: Project
	): Prisma.ProjectUncheckedCreateInput {
		return {
			id: project.id.toString(),
			opportunityId: project.opportunityId,
			projectTypeId: project.projectTypeId,
			municipalityId: project.municipalityId,
			title: project.title,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
		};
	}
}

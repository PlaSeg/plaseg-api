import { 
    Prisma, 
    Document as PrismaDocument,
    Field as PrismaField
} from "@prisma/client";
import { Document } from "../../../../domain/entities/document"; 
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { PrismaFieldMapper } from "./prisma-field-mapper";

export class PrismaDocumentMapper {
	static toDomain(raw: PrismaDocument & { fields: PrismaField[] }): Document {
		return Document.create(
			{
				name: raw.name,
				fields: raw.fields.map(PrismaFieldMapper.toDomain),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(document: Document, opportunityId: string): Prisma.DocumentUncheckedCreateInput {
		return {
			id: document.id.toString(),
			name: document.name,
            opportunityId: opportunityId
		};
	}
}
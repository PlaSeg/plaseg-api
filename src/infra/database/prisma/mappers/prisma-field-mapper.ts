import { Prisma, Field as PrismaField } from "@prisma/client";
import { Field } from "../../../../domain/entities/field";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export class PrismaFieldMapper {
	static toPrisma(
		field: Field,
		fieldParentId: string | null,
		projectTypeId: string
	): Prisma.FieldUncheckedCreateInput {
		return {
			id: field.id.toString(),
			name: field.name,
			value: field.value,
			parentId: fieldParentId,
			projectTypeId: projectTypeId,
			createdAt: field.createdAt,
			updatedAt: field.updatedAt,
		};
	}

	static toDomain(raw: PrismaField & { fields?: PrismaField[] }): Field {
		const children =
			raw.fields?.map((child) => PrismaFieldMapper.toDomain(child)) ?? [];

		return Field.create(
			{
				name: raw.name,
				value: raw.value || "",
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				fields: children,
			},
			new UniqueEntityID(raw.id)
		);
	}
}

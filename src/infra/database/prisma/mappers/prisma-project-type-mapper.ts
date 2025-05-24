import {
	Prisma,
	ProjectType as PrismaProjectType,
	Field as PrismaField
 } from "@prisma/client";
import { ProjectType } from "../../../../domain/entities/project-type";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Field } from "../../../../domain/entities/field";

export class PrismaProjectTypeMapper {
	private static buildFieldTree(fields: PrismaField[]): Field[] {
		type FieldNode = {
			field: PrismaField;
			children: FieldNode[];
		};

		const nodeMap = new Map<string, FieldNode>();

		for (const field of fields) {
			nodeMap.set(field.id, {
				field,
				children: [],
			});
		}

		const roots: FieldNode[] = [];

		for (const field of fields) {
			const node = nodeMap.get(field.id)!;
			if (field.parentId) {
				const parent = nodeMap.get(field.parentId);
				if (parent) {
					parent.children.push(node);
				}
			} else {
				roots.push(node);
			}
		}

		function toDomainRecursive(node: FieldNode): Field {
			return Field.create(
				{
					name: node.field.name,
					value: node.field.value || "",
					createdAt: node.field.createdAt,
					updatedAt: node.field.updatedAt,
					fields: node.children.map(toDomainRecursive),
				},
				new UniqueEntityID(node.field.id)
			);
		}

		return roots.map(toDomainRecursive);
	}

	static toPrisma(
		projectType: ProjectType
	): Prisma.ProjectTypeUncheckedCreateInput {
		return {
			id: projectType.id.toString(),
			name: projectType.name,
			createdAt: projectType.createdAt,
			updatedAt: projectType.updatedAt,
		};
	}

	static toDomain(
		raw: PrismaProjectType & { fields: PrismaField[] }
	): ProjectType {
		const fieldsTree = PrismaProjectTypeMapper.buildFieldTree(raw.fields);

		return ProjectType.create(
			{
				name: raw.name,
				fields: fieldsTree,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}
}

import { Type } from "../../../../domain/entities/type";
import { TypeGroup } from "../../../../domain/entities/value-objects/type-group";
import { TypesRepository } from "../../../../domain/repositories/type-repository";
import { PrismaTypeMapper } from "../mappers/prisma-type-mapper";
import { prisma } from "../prisma";

export class PrismaTypeRepository implements TypesRepository {
	async findByDescription(description: string): Promise<Type | null> {
		const type = await prisma.type.findUnique({
			where: {
				description,
			},
		});

		if (!type) {
			return null;
		}

		return PrismaTypeMapper.toDomain(type);
	}

	async findById(id: string): Promise<Type | null> {
		const type = await prisma.type.findUnique({
			where: {
				id,
			},
		});

		if (!type) {
			return null;
		}

		return PrismaTypeMapper.toDomain(type);
	}

	async findByGroupAndParentId(
		group: TypeGroup,
		parentId?: string
	): Promise<Type[] | null> {
		const types = await prisma.type.findMany({
			where: {
				group: group.toPrisma(),
				parentId: parentId ?? null,
			},
		});

		if (!types) {
			return null;
		}

		return types.map(PrismaTypeMapper.toDomain);
	}

	async findByGroup(group: TypeGroup): Promise<Type[] | null> {
		const types = await prisma.type.findMany({
			where: {
				group: group.toPrisma(),
			},
		});
		if (!types) {
			return null;
		}

		return types.map(PrismaTypeMapper.toDomain);
	}

	async findCategoryTree(typeId: string): Promise<Type[]> {
		const tree: Type[] = [];

		let current = await prisma.type.findUnique({
			where: { id: typeId },
		});

		while (current) {
			tree.unshift(PrismaTypeMapper.toDomain(current));
			if (!current.parentId) break;
			current = await prisma.type.findUnique({
				where: { id: current.parentId },
			});
		}

		return tree;
	}

	async findMany(): Promise<Type[] | null> {
		const types = await prisma.type.findMany({});

		if (!types) {
			return null;
		}

		return types.map(PrismaTypeMapper.toDomain);
	}

	async create(type: Type): Promise<void> {
		const data = PrismaTypeMapper.toPrisma(type);

		await prisma.type.create({
			data,
		});
	}

	async delete(id: string): Promise<void> {
		await prisma.type.delete({
			where: {
				id,
			},
		});
	}
}

import { Type } from "../../src/domain/entities/type";
import { TypeGroup } from "../../src/domain/entities/value-objects/type-group";
import { TypesRepository } from "../../src/domain/repositories/type-repository";

export class InMemoryTypeRepository implements TypesRepository {
	public items: Type[] = [];

	async create(type: Type): Promise<void> {
		this.items.push(type);
	}

	async findById(id: string): Promise<Type | null> {
		const type = this.items.find((item) => item.id.toString() === id);

		if (!type) {
			return null;
		}

		return type;
	}

	async findByDescription(description: string): Promise<Type | null> {
		const type = this.items.find((item) => item.description === description);

		if (!type) {
			return null;
		}

		return type;
	}

	async findMany(): Promise<Type[] | null> {
		return this.items;
	}

	async findByGroup(group: TypeGroup): Promise<Type[] | null> {
		const types = this.items.filter(
			(item) => item.group.toString() === group.toString()
		);
		return types.length > 0 ? types : null;
	}

	async findByGroupAndParentId(
		group: TypeGroup,
		parentId?: string
	): Promise<Type[] | null> {
		const types = this.items.filter((item) => {
			const matchesGroup = item.group.toString() === group.toString();
			const matchesParent = parentId
				? item.parentId?.toString() === parentId
				: !item.parentId;
			return matchesGroup && matchesParent;
		});
		return types.length > 0 ? types : null;
	}

	async findCategoryTree(typeId: string): Promise<Type[]> {
		const tree: Type[] = [];

		let current = this.items.find((item) => item.id.toString() === typeId);

		while (current) {
			tree.unshift(current);
			if (!current.parentId) break;
			current = this.items.find(
				(item) => item.id.toString() === current?.parentId?.toString()
			);
		}

		return tree;
	}
}

import { Type } from "../../src/domain/entities/type";
import { TypesRepository } from "../../src/domain/repositories/type-repository";

export class InMemoryTypeRepository implements TypesRepository {
	public items: Type[] = [];

	async findMany(): Promise<Type[] | null> {
		return this.items;
	}

	async findByDescription(description: string): Promise<Type | null> {
		const type = this.items.find((item) => item.description === description);

		if (!type) {
			return null;
		}

		return type;
	}

	async findById(id: string): Promise<Type | null> {
		const type = this.items.find((item) => item.id.toString() === id);

		if (!type) {
			return null;
		}

		return type;
	}

	async create(type: Type): Promise<void> {
		this.items.push(type);
	}

	async delete(id: string): Promise<void> {
		const typeIndex = this.items.findIndex((item) => item.id.toString() === id);

		if (typeIndex >= 0) {
			this.items.splice(typeIndex, 1);
		}
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

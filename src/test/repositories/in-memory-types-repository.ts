import { Type } from "../../domain/entities/type";
import { TypesRepository } from "../../domain/repositories/type-repository";
import { TypeGroup } from "../../domain/entities/value-objects/type-group";

export class InMemoryTypesRepository implements TypesRepository {
	public items: Type[] = [];

	async findById(id: string): Promise<Type | null> {
		const type = this.items.find((item) => item.id.toString() === id);

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
			(item) => item.group.getValue() === group.getValue()
		);

		return types;
	}

	async findByGroupAndParentId(
		group: TypeGroup,
		parentId?: string
	): Promise<Type[] | null> {
		const types = this.items.filter(
			(item) =>
				item.group.getValue() === group.getValue() && item.parentId === parentId
		);

		return types;
	}

	async findByDescription(description: string): Promise<Type | null> {
		const type = this.items.find((item) => item.description === description);

		if (!type) {
			return null;
		}

		return type;
	}

	async create(type: Type): Promise<void> {
		this.items.push(type);
	}
}

import { Type } from "../entities/type";
import { TypeGroup } from "../entities/value-objects/type-group";

export interface TypesRepository {
	findById(id: string): Promise<Type | null>;
	findMany(): Promise<Type[] | null>;
	findByGroup(group: TypeGroup): Promise<Type[] | null>;
	findByGroupAndParentId(
		group: TypeGroup,
		parentId?: string
	): Promise<Type[] | null>;
	findByDescription(description: string): Promise<Type | null>;
	create(type: Type): Promise<void>;
}

import { Type } from "../entities/type";

export interface TypesRepository {
	findById(id: string): Promise<Type | null>;
	findByDescription(description: string): Promise<Type | null>;
	findCategoryTree(typeId: string): Promise<Type[]>;
	findMany(): Promise<Type[] | null>;
	create(type: Type): Promise<void>;
	delete(id: string): Promise<void>;
}

import { BaseProduct } from "../entities/base-product";

export interface BaseProductsRepository {
	findById(id: string): Promise<BaseProduct | null>;
	findByCode(code: string): Promise<BaseProduct | null>;
	findMany(): Promise<BaseProduct[] | null>;
	createOpportunityBaseProduct(opportunityId: string, baseProductId: string): Promise<void>;
	create(baseProduct: BaseProduct): Promise<void>;
}

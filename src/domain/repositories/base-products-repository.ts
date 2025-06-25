import { BaseProduct } from "../entities/base-product";
import { BaseProductWithMoreInfo } from "../entities/value-objects/base-product-with-more-info";

export interface BaseProductsRepository {
	findById(id: string): Promise<BaseProduct | null>;
	findByCode(code: string): Promise<BaseProduct | null>;
	findMany(): Promise<BaseProduct[] | null>;
	findByOpportunityId(opportunityId: string): Promise<BaseProduct[]>;
	findBudgetById(baseProductId: string): Promise<BaseProductWithMoreInfo>;
	createOpportunityBaseProduct(opportunityId: string, baseProductId: string): Promise<void>;
	create(baseProduct: BaseProduct): Promise<void>;
}

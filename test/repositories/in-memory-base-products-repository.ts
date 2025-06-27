import { BaseProduct } from "../../src/domain/entities/base-product";
import { BaseProductWithMoreInfo } from "../../src/domain/entities/value-objects/base-product-with-more-info";
import { BaseProductsRepository } from "../../src/domain/repositories/base-products-repository";

export type InMemoryBaseProduct = BaseProduct & {
	specificProducts?: {
		budget: number;
		budgetValidity: Date;
	}[];
};

export class InMemoryBaseProductsRepository implements BaseProductsRepository {
	public items: InMemoryBaseProduct[] = [];
	public opportunityBaseProducts: {
		opportunityId: string;
		baseProductId: string;
	}[] = [];

	async findById(id: string): Promise<BaseProduct | null> {
		const baseProduct = this.items.find(
			(product) => product.id.toString() === id
		);

		if (!baseProduct) {
			return null;
		}

		return baseProduct;
	}

	async findByCode(code: string): Promise<BaseProduct | null> {
		const baseProduct = this.items.find((product) => product.code === code);

		if (!baseProduct) {
			return null;
		}

		return baseProduct;
	}

	async findByTypeId(typeId: string): Promise<BaseProduct[] | null> {
		const baseProducts = this.items.filter(
			(product) => product.typeId === typeId
		);

		if (!baseProducts.length) {
			return null;
		}

		return baseProducts;
	}

	async findMany(): Promise<BaseProduct[] | null> {
		return this.items.length > 0 ? this.items : null;
	}

	async createOpportunityBaseProduct(
		opportunityId: string,
		baseProductId: string
	): Promise<void> {
		this.opportunityBaseProducts.push({
			opportunityId,
			baseProductId,
		});
	}

	async findByOpportunityId(opportunityId: string): Promise<BaseProduct[]> {
		const relatedBaseProductIds = this.opportunityBaseProducts
			.filter((rel) => rel.opportunityId === opportunityId)
			.map((rel) => rel.baseProductId);

		return this.items.filter((item) =>
			relatedBaseProductIds.includes(item.id.toString())
		);
	}

	async findBudgetById(
		baseProductId: string
	): Promise<BaseProductWithMoreInfo> {
		const baseProduct = this.items.find(
			(product) => product.id.toString() === baseProductId
		);

		if (!baseProduct) {
			throw new Error("BaseProduct not found");
		}

		const specificProducts = baseProduct.specificProducts
			?.filter((sp) => sp.budgetValidity.getTime() > Date.now())
			.sort((a, b) => b.budgetValidity.getTime() - a.budgetValidity.getTime());

		let finalBudget = 0;
		let hasBudgets = true;

		if (specificProducts && specificProducts.length >= 3) {
			const top3Budgets = specificProducts
				.slice(0, 3)
				.map((sp) => Number(sp.budget));
			finalBudget =
				top3Budgets.reduce((acc, curr) => acc + curr, 0) / top3Budgets.length;
		} else if (
			baseProduct.budget1 &&
			baseProduct.budget1Validity.getTime() > Date.now() &&
			baseProduct.budget2 &&
			baseProduct.budget2Validity.getTime() > Date.now() &&
			baseProduct.budget3 &&
			baseProduct.budget3Validity.getTime() > Date.now()
		) {
			finalBudget =
				(Number(baseProduct.budget1) +
					Number(baseProduct.budget2) +
					Number(baseProduct.budget3)) /
				3;
		} else {
			finalBudget = Number(baseProduct.unitValue);
			hasBudgets = false;
		}

		return BaseProductWithMoreInfo.create({
			id: baseProduct.id,
			code: baseProduct.code,
			createdAt: baseProduct.createdAt,
			name: baseProduct.name,
			technicalDescription: baseProduct.technicalDescription,
			typeId: baseProduct.typeId,
			unitValue: baseProduct.unitValue,
			updatedAt: baseProduct.updatedAt,
			budget: finalBudget,
			hasBudgets,
		});
	}

	async create(baseProduct: BaseProduct): Promise<void> {
		this.items.push(baseProduct);
	}
}

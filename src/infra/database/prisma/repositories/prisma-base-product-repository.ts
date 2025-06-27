import { Decimal } from "@prisma/client/runtime/library";
import { BaseProduct } from "../../../../domain/entities/base-product";
import { BaseProductWithMoreInfo } from "../../../../domain/entities/value-objects/base-product-with-more-info";
import { BaseProductsRepository } from "../../../../domain/repositories/base-products-repository";
import { PrismaBaseProductMapper } from "../mappers/prisma-base-product-mapper";
import { PrismaBaseProductWithMoreInfoMapper } from "../mappers/prisma-base-product-with-more-info";
import { prisma } from "../prisma";

export class PrismaBaseProductsRepository implements BaseProductsRepository {
	async findByCode(code: string): Promise<BaseProduct | null> {
		const baseProduct = await prisma.baseProduct.findUnique({
			where: {
				code,
			},
		});

		if (!baseProduct) {
			return null;
		}

		return PrismaBaseProductMapper.toDomain(baseProduct);
	}

	async findMany(): Promise<BaseProduct[] | null> {
		const baseProducts = await prisma.baseProduct.findMany({});

		if (!baseProducts) {
			return null;
		}

		const baseProductsDomain = baseProducts.map((bp) => {
			return PrismaBaseProductMapper.toDomain(bp);
		});

		return baseProductsDomain;
	}

	async findByOpportunityId(opportunityId: string): Promise<BaseProduct[]> {
		const opportunityBaseProduct = await prisma.opportunityBaseProduct.findMany(
			{
				where: { opportunityId },
				include: {
					baseProduct: true,
				},
			}
		);

		return opportunityBaseProduct.map((opt) =>
			PrismaBaseProductMapper.toDomain(opt.baseProduct)
		);
	}

	async findBudgetById(
		baseProductId: string
	): Promise<BaseProductWithMoreInfo> {
		const baseProduct = await prisma.baseProduct.findUnique({
			where: {
				id: baseProductId,
			},
			include: {
				specificProducts: {
					where: {
						budget: {
							gt: 0    
						},
						budgetValidity: {
							gt: new Date(),
						},
					},
					orderBy: {
						budgetValidity: "desc",
					},
				},
			},
		});

		let finalBudget = 0;
		let hasBudgets = true;

		if (
			baseProduct?.specificProducts &&
			baseProduct?.specificProducts.length >= 3
		) {
			const top3Budgets = baseProduct?.specificProducts
				.slice(0, 3)
				.map((p) => Number(p.budget));

			finalBudget =
				top3Budgets.reduce((acc, curr) => acc + curr, 0) / top3Budgets.length;
		} else {
			if (
				baseProduct?.budget1 &&
				baseProduct?.budget1Validity.getTime() > Date.now() &&
				baseProduct?.budget2 &&
				baseProduct?.budget2Validity.getTime() > Date.now() &&
				baseProduct?.budget3 &&
				baseProduct?.budget3Validity.getTime() > Date.now()
			) {
				finalBudget =
					(Number(baseProduct?.budget1) +
						Number(baseProduct?.budget2) +
						Number(baseProduct?.budget3)) /
					3;
			} else {
				finalBudget = Number(baseProduct?.unitValue);
				hasBudgets = false;
			}
		}
		
		return PrismaBaseProductWithMoreInfoMapper.toDomain({
			...baseProduct!,
			budget: new Decimal(finalBudget),
			hasBudgets,
		});
	}

	async createOpportunityBaseProduct(
		opportunityId: string,
		baseProductId: string
	): Promise<void> {
		await prisma.opportunityBaseProduct.create({
			data: {
				opportunityId,
				baseProductId,
			},
		});
	}

	async create(baseProduct: BaseProduct): Promise<void> {
		const data = PrismaBaseProductMapper.toPrisma(baseProduct);

		await prisma.baseProduct.create({
			data,
		});
	}

	async findById(id: string): Promise<BaseProduct | null> {
		const baseProduct = await prisma.baseProduct.findUnique({
			where: {
				id,
			},
		});

		if (!baseProduct) {
			return null;
		}

		return PrismaBaseProductMapper.toDomain(baseProduct);
	}
}

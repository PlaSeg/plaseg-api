import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { CompaniesRepository } from "../../repositories/companies-repository";
import { SpecificProductsRepository } from "../../repositories/specific-products-repository";

type SpecificProductResponse = {
	id: string;
	brand: string;
	model: string;
	description: string;
	unitValue: number;
	warrantyMonths: number;
	budget: number;
	budgetValidity: Date;
	baseProductId: string;
	createdAt: Date;
	updatedAt: Date | null;
};

type GetSpecificProductResponse = Either<
	CustomError,
	{
		specificProducts: SpecificProductResponse[] | null;
	}
>;

export class GetSpecificProductUseCase {
	constructor(
		private specificProductsRepository: SpecificProductsRepository,
		private companiesRepository: CompaniesRepository
	) {}

	async execute({ userId }): Promise<GetSpecificProductResponse> {
		const company = await this.companiesRepository.findByUserId(userId);

		if (!company) {
			return left(
				new CustomError(409, "Você não tem uma empresa cadastrada ainda!")
			);
		}

		const specificProducts =
			await this.specificProductsRepository.findManyByCompany(
				company.id.toString()
			);

		if (!specificProducts) {
			return right({
				specificProducts: null,
			});
		}

		const specificProductResponse = specificProducts.map((specificProduct) => {
			return {
				id: specificProduct.id.toString(),
				brand: specificProduct.brand,
				model: specificProduct.model,
				description: specificProduct.description,
				unitValue: specificProduct.unitValue,
				warrantyMonths: specificProduct.warrantyMonths,
				budget: specificProduct.budget,
				budgetValidity: specificProduct.budgetValidity,
				baseProductId: specificProduct.baseProductId,
				createdAt: specificProduct.createdAt,
				updatedAt: specificProduct.updatedAt ?? null,
			};
		});

		return right({ specificProducts: specificProductResponse });
	}
}

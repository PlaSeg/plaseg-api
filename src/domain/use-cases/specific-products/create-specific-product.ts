import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { SpecificProduct } from "../../entities/specific-product";
import { BaseProductsRepository } from "../../repositories/base-products-repository";
import { CompaniesRepository } from "../../repositories/companies-repository";
import { SpecificProductsRepository } from "../../repositories/specific-products-repository";

type CreateSpecificProductUseCaseRequest = {
	brand: string;
	model: string;
	description: string;
	unitValue: number;
	warrantyMonths: number;
	budget: number;
	budgetValidity: Date;
	baseProductId: string;
	userId: string;
};

type CreateSpecificProductUseCaseResponse = Either<CustomError, null>;

export class CreateSpecificProductUseCase {
    constructor(private specificProductRepository: SpecificProductsRepository,
		private baseProductRepository: BaseProductsRepository,
		private companyRepository: CompaniesRepository,
    ) {}

	async execute(
		data: CreateSpecificProductUseCaseRequest
	): Promise<CreateSpecificProductUseCaseResponse> {
		const doesBaseProductExists = await this.baseProductRepository.findById(
			data.baseProductId
		);

		if (!doesBaseProductExists) {
			return left(
				new CustomError(409, "Esse produto base não existe")
			);
		}

		const company = await this.companyRepository.findByUserId(data.userId)

		if (!company) {
			return left(new CustomError(409, "Você não possui uma empresa cadastrada ainda!"));
		}

		const specificProduct = SpecificProduct.create({
			...data,
			companyId: company.id.toString()
		});

		await this.specificProductRepository.create(specificProduct);

		return right(null);
	}
}

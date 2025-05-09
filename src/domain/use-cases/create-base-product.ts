import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { BaseProduct } from "../entities/base-product";
import { BaseProductsRepository } from "../repositories/base-products-repository";

type CreateBaseProductUseCaseRequest = {
	code: string;
	name: string;
	technicalDescription: string;
	budget1: number;
	budget1Validity: Date;
	budget2: number;
	budget2Validity: Date;
	budget3: number;
	budget3Validity: Date;
	unitValue: number;
	typeId: string;
};

type CreateBaseProductUseCaseResponse = Either<CustomError, null>;

export class CreateBaseProductUseCase {
	constructor(private baseProductRepository: BaseProductsRepository) {}

	async execute(
		data: CreateBaseProductUseCaseRequest
	): Promise<CreateBaseProductUseCaseResponse> {
		const doesBaseProductExists = await this.baseProductRepository.findByCode(
			data.code
		);

		if (doesBaseProductExists) {
			return left(
				new CustomError(
					409,
					"Produto base com esse código já cadastrado!"
				)
			);
		}

		const baseProduct = BaseProduct.create({
			...data
		});

		await this.baseProductRepository.create(baseProduct);

		return right(null);
	}
}

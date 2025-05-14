import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { BaseProductsRepository } from "../repositories/base-products-repository";
import { TypesRepository } from "../repositories/types-repository";

type GetBaseProductByIdUseCaseRequest = {
	id: string;
};

type BaseProductResponse = {
	id: string;
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
	category: string;
	createdAt: Date;
	updatedAt: Date | null;
};

type GetBaseProductByIdUseCaseResponse = Either<
	CustomError,
	{
		baseProduct: BaseProductResponse;
	}
>;

export class GetBaseProductByIdUseCase {
	constructor(
		private baseProductsRepository: BaseProductsRepository,
		private typeRepository: TypesRepository
	) {}

	async execute(
		request: GetBaseProductByIdUseCaseRequest
	): Promise<GetBaseProductByIdUseCaseResponse> {
		const baseProduct = await this.baseProductsRepository.findById(request.id);

		if (!baseProduct) {
			return left(new CustomError(404, "Produto base não encontrado"));
		}

		const category = await this.typeRepository.findById(baseProduct.typeId);

		const baseProductResponse = {
			id: baseProduct.id.toString(),
			code: baseProduct.code,
			name: baseProduct.name,
			technicalDescription: baseProduct.technicalDescription,
			budget1: baseProduct.budget1,
			budget1Validity: baseProduct.budget1Validity,
			budget2: baseProduct.budget2,
			budget2Validity: baseProduct.budget2Validity,
			budget3: baseProduct.budget3,
			budget3Validity: baseProduct.budget3Validity,
			unitValue: baseProduct.unitValue,
			typeId: baseProduct.typeId,
			category: category ? category.description : "",
			createdAt: baseProduct.createdAt,
			updatedAt: baseProduct.updatedAt ?? null,
		};

		return right({ baseProduct: baseProductResponse });
	}
}

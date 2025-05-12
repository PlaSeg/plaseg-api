import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Type } from "../entities/type";
import { BaseProductsRepository } from "../repositories/base-products-repository";
import { TypesRepository } from "../repositories/type-repository";

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
	subcategory: string | null;
	subsubcategory: string | null;
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

	private extractCategoryTree(categories: Type[]) {
		const category = categories[0]?.description ?? null;
		const subcategory = categories[1]?.description ?? null;
		const subsubcategory = categories[2]?.description ?? null;

		return { category, subcategory, subsubcategory };
	}

	async execute(
		request: GetBaseProductByIdUseCaseRequest
	): Promise<GetBaseProductByIdUseCaseResponse> {
		const baseProduct = await this.baseProductsRepository.findById(request.id);

		if (!baseProduct) {
			return left(new CustomError(404, "Produto base não encontrado"));
		}

		const categoriesPrisma = await this.typeRepository.findCategoryTree(
			baseProduct.typeId
		);

		const categories = this.extractCategoryTree(categoriesPrisma);

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
			...categories,
			createdAt: baseProduct.createdAt,
			updatedAt: baseProduct.updatedAt ?? null,
		};

		return right({ baseProduct: baseProductResponse });
	}
}

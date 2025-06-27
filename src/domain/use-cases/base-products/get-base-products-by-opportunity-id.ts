import { CustomError } from "../../../core/errors/custom-error";
import { Either, right } from "../../../core/types/either";
import { BaseProductWithMoreInfo } from "../../entities/value-objects/base-product-with-more-info";
import { BaseProductsRepository } from "../../repositories/base-products-repository";

type GetBaseProductsByOpportunityIdUseCaseResponse = Either<
	CustomError,
	{
		baseProducts: BaseProductWithMoreInfo[];
	}
>;

export class GetBaseProductsByOpportunityIdUseCase {
	constructor(private baseProductsRepository: BaseProductsRepository) {}

	async execute(
		opportunityId: string
	): Promise<GetBaseProductsByOpportunityIdUseCaseResponse> {
		const baseProductsTemporary =
			await this.baseProductsRepository.findByOpportunityId(opportunityId);

		const baseProducts = await Promise.all(
			baseProductsTemporary.map((bpt) =>
				this.baseProductsRepository.findBudgetById(bpt.id.toString())
			)
		);

		return right({ baseProducts });
	}
}

import { BaseProductWithMoreInfo } from "../../../domain/entities/value-objects/base-product-with-more-info";
import { BaseProductWithMoreInfoResponse } from "../schemas/base-product";

export class BaseProductWithMoreInfoPresenter {
	static toHTTP(
		baseProduct: BaseProductWithMoreInfo
	): BaseProductWithMoreInfoResponse {
		return {
			id: baseProduct.id.toString(),
			name: baseProduct.name,
			hasBudgets: baseProduct.hasBudgets
		};
	}
}

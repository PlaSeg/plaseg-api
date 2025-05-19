import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { PriceRegistrationRecordsRepository } from "../../repositories/price-registration-records-repository";
import { PriceRegistrationRecordItem } from "../../entities/price-registration-record-item";
import { PriceRegistrationRecordItemRepository } from "../../repositories/price-registration-record-items-repository";
import { SpecificProductsRepository } from "../../repositories/specific-products-repository";

type PriceRegistrationRecordItemData = {
	specificProductId: string;
	unitValue: number;
	quantity: number;
	minAdherenceQuantity: number;
	maxAdherenceQuantity: number;
};

type CreatePriceRegistrationRecordItemUseCaseRequest = {
	priceRegistrationRecordId: string;
	items: PriceRegistrationRecordItemData[];
};

type CreatePriceRegistrationRecordItemUseCaseResponse = Either<
	CustomError,
	{
		priceRegistrationRecordItems: {
			id: string;
			priceRegistrationRecordId: string;
			specificProductId: string;
			unitValue: number;
			quantity: number;
			minAdherenceQuantity: number;
			maxAdherenceQuantity: number;
			createdAt: Date;
			updatedAt: Date | null;
		}[];
	}
>;

export class CreatePriceRegistrationRecordItemUseCase {
	constructor(
		private priceRegistrationRecordRepository: PriceRegistrationRecordsRepository,
		private priceRegistrationRecordItemRepository: PriceRegistrationRecordItemRepository,
		private specificProductsRepository: SpecificProductsRepository
	) {}

	private validateItem(
		item: PriceRegistrationRecordItemData
	): Either<CustomError, null> {
		if (!item.specificProductId) {
			return left(
				new CustomError(400, "ID do produto específico é obrigatório!")
			);
		}
		if (!item.quantity || item.quantity <= 0) {
			return left(
				new CustomError(400, "Quantidade do item deve ser maior que zero!")
			);
		}
		if (!item.unitValue || item.unitValue <= 0) {
			return left(
				new CustomError(400, "Valor unitário do item deve ser maior que zero!")
			);
		}
		if (!item.minAdherenceQuantity || item.minAdherenceQuantity <= 0) {
			return left(
				new CustomError(
					400,
					"Quantidade mínima de adesão deve ser maior que zero!"
				)
			);
		}
		if (!item.maxAdherenceQuantity || item.maxAdherenceQuantity <= 0) {
			return left(
				new CustomError(
					400,
					"Quantidade máxima de adesão deve ser maior que zero!"
				)
			);
		}
		if (item.minAdherenceQuantity > item.maxAdherenceQuantity) {
			return left(
				new CustomError(
					400,
					"Quantidade mínima de adesão não pode ser maior que a quantidade máxima!"
				)
			);
		}
		return right(null);
	}

	async execute(
		data: CreatePriceRegistrationRecordItemUseCaseRequest
	): Promise<CreatePriceRegistrationRecordItemUseCaseResponse> {
		const record = await this.priceRegistrationRecordRepository.findById(
			data.priceRegistrationRecordId
		);

		if (!record) {
			return left(new CustomError(404, "Ata não encontrada!"));
		}

		for (const item of data.items) {
			const validateItemResult = this.validateItem(item);
			if (validateItemResult.isLeft()) {
				return left(validateItemResult.value);
			}

			const specificProduct = await this.specificProductsRepository.findById(
				item.specificProductId
			);

			if (!specificProduct) {
				return left(new CustomError(404, `Produto específico não encontrado!`));
			}
		}

		const items = data.items.map((item) => {
			return PriceRegistrationRecordItem.create({
				priceRegistrationRecordId: data.priceRegistrationRecordId,
				specificProductId: item.specificProductId,
				unitValue: item.unitValue,
				quantity: item.quantity,
				minAdherenceQuantity: item.minAdherenceQuantity,
				maxAdherenceQuantity: item.maxAdherenceQuantity,
			});
		});

		for (const item of items) {
			await this.priceRegistrationRecordItemRepository.create(item);
		}

		return right({
			priceRegistrationRecordItems: items.map((item) => ({
				id: item.id.toString(),
				priceRegistrationRecordId: item.priceRegistrationRecordId,
				specificProductId: item.specificProductId,
				unitValue: item.unitValue,
				quantity: item.quantity,
				minAdherenceQuantity: item.minAdherenceQuantity,
				maxAdherenceQuantity: item.maxAdherenceQuantity,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt ?? null,
			})),
		});
	}
}

import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { PriceRegistrationRecordItem } from "../entities/price-registration-record-item";
import { PriceRegistrationRecordItemRepository } from "../repositories/price-registration-record-item-repository";
import { PriceRegistrationRecordRepository } from "../repositories/price-registration-record-repository";

type CreatePriceRegistrationRecordItemUseCaseRequest = {
	priceRegistrationRecordId: string;
	unitValue: number;
	quantity: number;
	minAdherenceQuantity: number;
	maxAdherenceQuantity: number;
};

type CreatePriceRegistrationRecordItemUseCaseResponse = Either<
	CustomError,
	{
		priceRegistrationRecordItem: {
			id: string;
			priceRegistrationRecordId: string;
			unitValue: number;
			quantity: number;
			minAdherenceQuantity: number;
			maxAdherenceQuantity: number;
			createdAt: Date;
			updatedAt: Date | null;
		};
	}
>;

export class CreatePriceRegistrationRecordItemUseCase {
	constructor(
		private priceRegistrationRecordItemsRepository: PriceRegistrationRecordItemRepository,
		private priceRegistrationRecordsRepository: PriceRegistrationRecordRepository
	) {}

	async execute(
		request: CreatePriceRegistrationRecordItemUseCaseRequest
	): Promise<CreatePriceRegistrationRecordItemUseCaseResponse> {
		const priceRegistrationRecord =
			await this.priceRegistrationRecordsRepository.findById(
				request.priceRegistrationRecordId
			);

		if (!priceRegistrationRecord) {
			return left(
				new CustomError(404, "Ata de registro de preço não encontrado")
			);
		}

		const priceRegistrationRecordItem = PriceRegistrationRecordItem.create({
			priceRegistrationRecordId: request.priceRegistrationRecordId,
			unitValue: request.unitValue,
			quantity: request.quantity,
			minAdherenceQuantity: request.minAdherenceQuantity,
			maxAdherenceQuantity: request.maxAdherenceQuantity,
		});

		await this.priceRegistrationRecordItemsRepository.create(
			priceRegistrationRecordItem
		);

		return right({
			priceRegistrationRecordItem: {
				id: priceRegistrationRecordItem.id.toString(),
				priceRegistrationRecordId:
					priceRegistrationRecordItem.priceRegistrationRecordId,
				unitValue: priceRegistrationRecordItem.unitValue,
				quantity: priceRegistrationRecordItem.quantity,
				minAdherenceQuantity: priceRegistrationRecordItem.minAdherenceQuantity,
				maxAdherenceQuantity: priceRegistrationRecordItem.maxAdherenceQuantity,
				createdAt: priceRegistrationRecordItem.createdAt,
				updatedAt: priceRegistrationRecordItem.updatedAt ?? null,
			},
		});
	}
}

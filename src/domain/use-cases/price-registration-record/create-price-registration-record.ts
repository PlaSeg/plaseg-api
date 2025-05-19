import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { PriceRegistrationRecord } from "../../entities/price-registration-record";
import { PriceRegistrationRecordItem } from "../../entities/price-registration-record-item";
import { PriceRegistrationRecordsRepository } from "../../repositories/price-registration-records-repository";
import { SpecificProductsRepository } from "../../repositories/specific-products-repository";

type CreatePriceRegistrationRecordUseCaseRequest = {
	number: string;
	publicAgency: string;
	year: Date;
	effectiveDate: Date;
	status: string;
	userId: string;
	items: {
		specificProductId: string;
		unitValue: number;
		quantity: number;
		minAdherenceQuantity: number;
		maxAdherenceQuantity: number;
	}[];
};

type CreatePriceRegistrationRecordUseCaseResponse = Either<CustomError, null>;

export class CreatePriceRegistrationRecordUseCase {
	constructor(
		private priceRegistrationRecordsRepository: PriceRegistrationRecordsRepository,
		private specificProductsRepository: SpecificProductsRepository
	) {}

	async execute(
		data: CreatePriceRegistrationRecordUseCaseRequest
	): Promise<CreatePriceRegistrationRecordUseCaseResponse> {
		if (!data.number) {
			return left(new CustomError(400, "Número da ata é obrigatório!"));
		}

		if (!data.items || data.items.length === 0) {
			return left(
				new CustomError(400, "A ata deve conter pelo menos um item!")
			);
		}

		const doesRecordAlreadyExist =
			await this.priceRegistrationRecordsRepository.findByNumber(data.number);

		if (doesRecordAlreadyExist) {
			return left(new CustomError(409, "Já existe uma ata com este número!"));
		}

		for (const item of data.items) {
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
					new CustomError(
						400,
						"Valor unitário do item deve ser maior que zero!"
					)
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

			const specificProduct = await this.specificProductsRepository.findById(
				item.specificProductId
			);

			if (!specificProduct) {
				return left(new CustomError(404, "Produto específico não encontrado!"));
			}
		}

		const record = PriceRegistrationRecord.create({
			number: data.number,
			publicAgency: data.publicAgency,
			year: data.year,
			effectiveDate: data.effectiveDate,
			status: data.status,
			userId: data.userId,
		});

		const items = data.items.map((item) => {
			return PriceRegistrationRecordItem.create({
				priceRegistrationRecordId: record.id.toString(),
				specificProductId: item.specificProductId,
				unitValue: item.unitValue,
				quantity: item.quantity,
				minAdherenceQuantity: item.minAdherenceQuantity,
				maxAdherenceQuantity: item.maxAdherenceQuantity,
			});
		});

		record.priceRegistrationRecordItems = items;

		await this.priceRegistrationRecordsRepository.create(record);

		return right(null);
	}
}

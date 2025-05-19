import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { PriceRegistrationRecord } from "../../entities/price-registration-record";
import { PriceRegistrationRecordItem } from "../../entities/price-registration-record-item";
import { PriceRegistrationRecordsRepository } from "../../repositories/price-registration-records-repository";

type CreatePriceRegistrationRecordItemUseCaseRequest = {
	specificProductId: string;
	unitValue: number;
	quantity: number;
	minAdherenceQuantity: number;
	maxAdherenceQuantity: number;
};

type CreatePriceRegistrationRecordUseCaseRequest = {
	number: string;
	publicAgency: string;
	year: Date;
	effectiveDate: Date;
	status: string;
	userId: string;
	items: CreatePriceRegistrationRecordItemUseCaseRequest[];
};

type CreatePriceRegistrationRecordUseCaseResponse = Either<CustomError, null>;

export class CreatePriceRegistrationRecordUseCase {
	constructor(
		private priceRegistrationRecordsRepository: PriceRegistrationRecordsRepository
	) {}

	private validateDuplicateNumber(number: string): Either<CustomError, null> {
		if (!number) {
			return left(new CustomError(400, "Número da ata é obrigatório!"));
		}
		return right(null);
	}

	private validateItems(
		items: CreatePriceRegistrationRecordItemUseCaseRequest[]
	): Either<CustomError, null> {
		if (!items || items.length === 0) {
			return left(
				new CustomError(400, "A ata deve conter pelo menos um item!")
			);
		}
		return right(null);
	}

	async execute(
		data: CreatePriceRegistrationRecordUseCaseRequest
	): Promise<CreatePriceRegistrationRecordUseCaseResponse> {
		const validateNumberResult = this.validateDuplicateNumber(data.number);
		if (validateNumberResult.isLeft()) {
			return validateNumberResult;
		}

		const validateItemsResult = this.validateItems(data.items);
		if (validateItemsResult.isLeft()) {
			return validateItemsResult;
		}

		const doesRecordAlreadyExist =
			await this.priceRegistrationRecordsRepository.findByNumber(data.number);
		if (doesRecordAlreadyExist) {
			return left(new CustomError(409, "Já existe uma ata com este número!"));
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

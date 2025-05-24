import { CustomError } from "../../../core/errors/custom-error";
import { Either, right } from "../../../core/types/either";
import { PriceRegistrationRecordsRepository } from "../../repositories/price-registration-records-repository";

type PriceRegistrationRecordResponse = {
	id: string;
	publicAgency: string;
	number: string;
	year: number;
	effectiveDate: Date;
	status: string;
	companyId: string;
	items: {
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
	createdAt: Date;
	updatedAt: Date | null;
};

type GetPriceRegistrationRecordUseCaseResponse = Either<
	CustomError,
	{
		priceRegistrationRecords: PriceRegistrationRecordResponse[];
	}
>;

export class GetPriceRegistrationRecordUseCase {
	constructor(
		private priceRegistrationRecordsRepository: PriceRegistrationRecordsRepository
	) {}

	async execute(): Promise<GetPriceRegistrationRecordUseCaseResponse> {
		const priceRegistrationRecords =
			await this.priceRegistrationRecordsRepository.findMany();

		if (!priceRegistrationRecords) {
			return right({
				priceRegistrationRecords: [],
			});
		}

		const priceRegistrationRecordsResponse: PriceRegistrationRecordResponse[] =
			await Promise.all(
				priceRegistrationRecords.map(async (record) => {
					return {
						id: record.id.toString(),
						publicAgency: record.publicAgency,
						number: record.number,
						year: record.year,
						effectiveDate: record.effectiveDate,
						status: record.status,
						companyId: record.companyId,
						items: record.priceRegistrationRecordItems.map((item) => ({
							id: item.id.toString(),
							priceRegistrationRecordId: record.id.toString(),
							specificProductId: item.specificProductId,
							unitValue: item.unitValue,
							quantity: item.quantity,
							minAdherenceQuantity: item.minAdherenceQuantity,
							maxAdherenceQuantity: item.maxAdherenceQuantity,
							createdAt: item.createdAt,
							updatedAt: item.updatedAt ?? null,
						})),
						createdAt: record.createdAt,
						updatedAt: record.updatedAt ?? null,
					};
				})
			);

		return right({
			priceRegistrationRecords: priceRegistrationRecordsResponse,
		});
	}
}

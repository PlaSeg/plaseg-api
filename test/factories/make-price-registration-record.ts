import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { PriceRegistrationRecord } from "../../src/domain/entities/price-registration-record";
import { PriceRegistrationRecordItem } from "../../src/domain/entities/price-registration-record-item";

export function makePriceRegistrationRecord(
	override: Partial<PriceRegistrationRecord> = {},
	id?: UniqueEntityID
) {
	const recordId = id || new UniqueEntityID();

	const priceRegistrationRecord = PriceRegistrationRecord.create(
		{
			companyId: new UniqueEntityID().toString(),
			number: "1234567890",
			publicAgency: "1234567890",
			year: 2024,
			effectiveDate: new Date(),
			status: "active",
			priceRegistrationRecordItems: [
				PriceRegistrationRecordItem.create({
					priceRegistrationRecordId: recordId.toString(),
					specificProductId: new UniqueEntityID().toString(),
					unitValue: 100,
					quantity: 1,
					minAdherenceQuantity: 1,
					maxAdherenceQuantity: 10,
				}),
			],
			...override,
		},
		recordId
	);

	return priceRegistrationRecord;
}

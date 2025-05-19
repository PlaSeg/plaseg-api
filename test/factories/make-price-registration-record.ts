import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { PriceRegistrationRecord } from "../../src/domain/entities/price-registration-record";
import { PriceRegistrationRecordItem } from "../../src/domain/entities/price-registration-record-item";
import { makePriceRegistrationRecordItem } from "./make-price-registration-record-item";
export function makePriceRegistrationRecord(
	override: Partial<PriceRegistrationRecord> = {},
	id?: UniqueEntityID
) {
	const priceRegistrationRecord = PriceRegistrationRecord.create(
		{
			userId: new UniqueEntityID().toString(),
			number: "1234567890",
			publicAgency: "1234567890",
			year: new Date(),
			effectiveDate: new Date(),
			status: "active",
			priceRegistrationRecordItems: [makePriceRegistrationRecordItem()],
			...override,
		},
		id
	);

	return priceRegistrationRecord;
}

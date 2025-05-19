import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { PriceRegistrationRecordItem } from "../../src/domain/entities/price-registration-record-item";

export function makePriceRegistrationRecordItem(
	override: Partial<PriceRegistrationRecordItem> = {}
) {
	const priceRegistrationRecordItem = PriceRegistrationRecordItem.create(
		{
			priceRegistrationRecordId: new UniqueEntityID().toString(),
			specificProductId: new UniqueEntityID().toString(),
			unitValue: 100,
			quantity: 5,
			minAdherenceQuantity: 1,
			maxAdherenceQuantity: 10,
			...override,
		},
		new UniqueEntityID()
	);

	return priceRegistrationRecordItem;
}

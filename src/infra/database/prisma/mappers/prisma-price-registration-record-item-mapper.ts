import {
	Prisma,
	PriceRegistrationRecordItem as PrismaPriceRegistrationRecordItem,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { PriceRegistrationRecordItem } from "../../../../domain/entities/price-registration-record-item";

export class PrismaPriceRegistrationRecordItemMapper {
	static toDomain(
		raw: PrismaPriceRegistrationRecordItem
	): PriceRegistrationRecordItem {
		return PriceRegistrationRecordItem.create(
			{
				priceRegistrationRecordId: raw.priceRegistrationRecordId,
				specificProductId: raw.specificProductId,
				unitValue: Number(raw.unitValue),
				quantity: raw.quantity,
				minAdherenceQuantity: raw.minAdherenceQuantity,
				maxAdherenceQuantity: raw.maxAdherenceQuantity,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		priceRegistrationRecordItem: PriceRegistrationRecordItem
	): Prisma.PriceRegistrationRecordItemUncheckedCreateInput {
		return {
			id: priceRegistrationRecordItem.id.toString(),
			priceRegistrationRecordId:
				priceRegistrationRecordItem.priceRegistrationRecordId,
			specificProductId: priceRegistrationRecordItem.specificProductId,
			unitValue: priceRegistrationRecordItem.unitValue,
			quantity: priceRegistrationRecordItem.quantity,
			minAdherenceQuantity: priceRegistrationRecordItem.minAdherenceQuantity,
			maxAdherenceQuantity: priceRegistrationRecordItem.maxAdherenceQuantity,
		};
	}
}

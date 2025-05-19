import {
	Prisma,
	PriceRegistrationRecord as PrismaPriceRegistrationRecord,
	PriceRegistrationRecordItem as PrismaPriceRegistrationRecordItem,
} from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { PriceRegistrationRecord } from "../../../../domain/entities/price-registration-record";
import { PriceRegistrationRecordItem } from "../../../../domain/entities/price-registration-record-item";

export class PrismaPriceRegistrationRecordMapper {
	static toDomain(
		raw: PrismaPriceRegistrationRecord & {
			priceRegistrationRecordItems: PrismaPriceRegistrationRecordItem[];
		}
	): PriceRegistrationRecord {
		const priceRegistrationRecordItems = raw.priceRegistrationRecordItems.map(
			(item) =>
				PriceRegistrationRecordItem.create(
					{
						priceRegistrationRecordId: item.priceRegistrationRecordId,
						specificProductId: item.specificProductId,
						unitValue: Number(item.unitValue),
						quantity: item.quantity,
						minAdherenceQuantity: item.minAdherenceQuantity,
						maxAdherenceQuantity: item.maxAdherenceQuantity,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
					},
					new UniqueEntityID(item.id)
				)
		);

		return PriceRegistrationRecord.create(
			{
				publicAgency: raw.publicAgency,
				number: raw.number,
				year: raw.year,
				effectiveDate: raw.effectiveDate,
				status: raw.status,
				userId: raw.userId,
				priceRegistrationRecordItems,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		priceRegistrationRecord: PriceRegistrationRecord
	): Prisma.PriceRegistrationRecordUncheckedCreateInput {
		return {
			id: priceRegistrationRecord.id.toString(),
			publicAgency: priceRegistrationRecord.publicAgency,
			number: priceRegistrationRecord.number,
			year: priceRegistrationRecord.year,
			effectiveDate: priceRegistrationRecord.effectiveDate,
			status: priceRegistrationRecord.status,
			userId: priceRegistrationRecord.userId,
			priceRegistrationRecordItems: {
				create: priceRegistrationRecord.priceRegistrationRecordItems.map(
					(item) => ({
						id: item.id.toString(),
						priceRegistrationRecordId: item.priceRegistrationRecordId,
						specificProductId: item.specificProductId,
						unitValue: item.unitValue,
						quantity: item.quantity,
						minAdherenceQuantity: item.minAdherenceQuantity,
						maxAdherenceQuantity: item.maxAdherenceQuantity,
					})
				),
			},
		};
	}
}

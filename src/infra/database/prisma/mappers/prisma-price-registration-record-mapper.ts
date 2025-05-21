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
			priceRegistrationRecordItems?: PrismaPriceRegistrationRecordItem[];
		}
	): PriceRegistrationRecord {
		return PriceRegistrationRecord.create(
			{
				publicAgency: raw.publicAgency,
				number: raw.number,
				year: raw.year,
				effectiveDate: raw.effectiveDate,
				status: raw.status,
				companyId: raw.companyId ?? "",
				priceRegistrationRecordItems:
					raw.priceRegistrationRecordItems?.map((item) =>
						PriceRegistrationRecordItem.create({
							priceRegistrationRecordId: item.priceRegistrationRecordId,
							specificProductId: item.specificProductId,
							unitValue: Number(item.unitValue),
							quantity: item.quantity,
							minAdherenceQuantity: item.minAdherenceQuantity,
							maxAdherenceQuantity: item.maxAdherenceQuantity,
							createdAt: item.createdAt,
							updatedAt: item.updatedAt,
						})
					) ?? [],
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(
		record: PriceRegistrationRecord
	): Omit<
		Prisma.PriceRegistrationRecordUncheckedCreateInput,
		"createdAt" | "updatedAt"
	> {
		return {
			id: record.id.toString(),
			publicAgency: record.publicAgency,
			number: record.number,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
		};
	}
}

import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import {
    BaseProduct as PrismaBaseProduct
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { BaseProductWithMoreInfo } from "../../../../domain/entities/value-objects/base-product-with-more-info";

type PrismaBaseProductWithMoreInfo = PrismaBaseProduct & {
	budget: Decimal;
	hasBudgets: boolean;
};

export class PrismaBaseProductWithMoreInfoMapper {
	static toDomain(raw: PrismaBaseProductWithMoreInfo): BaseProductWithMoreInfo {
		return BaseProductWithMoreInfo.create({
			id: new UniqueEntityID(raw.id),
			code: raw.code,
			name: raw.name,
			technicalDescription: raw.technicalDescription,
			hasBudgets: raw.hasBudgets,
			budget: raw.budget.toNumber(),
			unitValue: raw.unitValue.toNumber(),
			typeId: raw.typeId,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}
}

import { PriceRegistrationRecordItem } from "../../../../domain/entities/price-registration-record-item";
import { PriceRegistrationRecordItemRepository } from "../../../../domain/repositories/price-registration-record-items-repository";
import { PrismaPriceRegistrationRecordItemMapper } from "../mappers/prisma-price-registration-record-item-mapper";
import { prisma } from "../prisma";

export class PrismaPriceRegistrationRecordItemsRepository
	implements PriceRegistrationRecordItemRepository
{
	async findById(id: string): Promise<PriceRegistrationRecordItem | null> {
		const item = await prisma.priceRegistrationRecordItem.findUnique({
			where: {
				id,
			},
		});

		if (!item) {
			return null;
		}

		return PrismaPriceRegistrationRecordItemMapper.toDomain(item);
	}

	async findMany(): Promise<PriceRegistrationRecordItem[] | null> {
		const items = await prisma.priceRegistrationRecordItem.findMany();

		if (items.length === 0) {
			return null;
		}

		return items.map(PrismaPriceRegistrationRecordItemMapper.toDomain);
	}

	async findByPriceRegistrationRecordId(
		priceRegistrationRecordId: string
	): Promise<PriceRegistrationRecordItem[] | null> {
		const items = await prisma.priceRegistrationRecordItem.findMany({
			where: {
				priceRegistrationRecordId,
			},
		});

		if (items.length === 0) {
			return null;
		}

		return items.map(PrismaPriceRegistrationRecordItemMapper.toDomain);
	}

	async create(item: PriceRegistrationRecordItem): Promise<void> {
		const data = PrismaPriceRegistrationRecordItemMapper.toPrisma(item);

		await prisma.priceRegistrationRecordItem.create({
			data,
		});
	}

	async update(item: PriceRegistrationRecordItem): Promise<void> {
		const data = PrismaPriceRegistrationRecordItemMapper.toPrisma(item);

		await prisma.priceRegistrationRecordItem.update({
			where: {
				id: item.id.toString(),
			},
			data,
		});
	}
}

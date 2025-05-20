import { PriceRegistrationRecordItem } from "../../src/domain/entities/price-registration-record-item";
import { PriceRegistrationRecordItemRepository } from "../../src/domain/repositories/price-registration-record-items-repository";

export class InMemoryPriceRegistrationRecordsItensRepository
	implements PriceRegistrationRecordItemRepository
{
	public items: PriceRegistrationRecordItem[] = [];

	async findById(id: string): Promise<PriceRegistrationRecordItem | null> {
		const item = this.items.find((item) => item.id.toString() === id);

		if (!item) {
			return null;
		}

		return item;
	}

	async findMany(): Promise<PriceRegistrationRecordItem[] | null> {
		if (this.items.length === 0) {
			return null;
		}
		return this.items;
	}

	async findByPriceRegistrationRecordId(
		priceRegistrationRecordId: string
	): Promise<PriceRegistrationRecordItem[] | null> {
		const items = this.items.filter(
			(item) =>
				item.priceRegistrationRecordId.toString() === priceRegistrationRecordId
		);

		if (items.length === 0) {
			return null;
		}

		return items;
	}

	async create(
		priceRegistrationRecordItem: PriceRegistrationRecordItem
	): Promise<void> {
		this.items.push(priceRegistrationRecordItem);
	}

	async update(
		priceRegistrationRecordItem: PriceRegistrationRecordItem
	): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id.toString() === priceRegistrationRecordItem.id.toString()
		);

		if (itemIndex >= 0) {
			this.items[itemIndex] = priceRegistrationRecordItem;
		}
	}
}

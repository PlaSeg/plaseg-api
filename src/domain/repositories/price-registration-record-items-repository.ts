import { PriceRegistrationRecordItem } from "../entities/price-registration-record-item";

export interface PriceRegistrationRecordItemRepository {
	findById(id: string): Promise<PriceRegistrationRecordItem | null>;
	findMany(): Promise<PriceRegistrationRecordItem[] | null>;
	findByPriceRegistrationRecordId(
		priceRegistrationRecordId: string
	): Promise<PriceRegistrationRecordItem[] | null>;
	create(
		priceRegistrationRecordItem: PriceRegistrationRecordItem
	): Promise<void>;
	update(
		priceRegistrationRecordItem: PriceRegistrationRecordItem
	): Promise<void>;
}

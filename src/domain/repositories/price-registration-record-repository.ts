import { PriceRegistrationRecord } from "../entities/price-registration-record";

export interface PriceRegistrationRecordRepository {
	findById(id: string): Promise<PriceRegistrationRecord | null>;
	findMany(): Promise<PriceRegistrationRecord[] | null>;
	findByNumber(number: string): Promise<PriceRegistrationRecord | null>;
	findByPublicAgency(
		publicAgency: string
	): Promise<PriceRegistrationRecord[] | null>;
	create(priceRegistrationRecord: PriceRegistrationRecord): Promise<void>;
	update(priceRegistrationRecord: PriceRegistrationRecord): Promise<void>;
}

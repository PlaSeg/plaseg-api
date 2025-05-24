import { PriceRegistrationRecord } from "../../src/domain/entities/price-registration-record";
import { PriceRegistrationRecordsRepository } from "../../src/domain/repositories/price-registration-records-repository";

export class InMemoryPriceRegistrationRecordsRepository
	implements PriceRegistrationRecordsRepository
{
	public items: PriceRegistrationRecord[] = [];

	async findMany(): Promise<PriceRegistrationRecord[] | null> {
		if (this.items.length === 0) {
			return null;
		}
		return this.items;
	}

	async findById(id: string): Promise<PriceRegistrationRecord | null> {
		const record = this.items.find((record) => record.id.toString() === id);

		if (!record) {
			return null;
		}

		return record;
	}

	async findByNumber(number: string): Promise<PriceRegistrationRecord | null> {
		const record = this.items.find((record) => record.number === number);

		if (!record) {
			return null;
		}

		return record;
	}

	async findByPublicAgency(
		publicAgency: string
	): Promise<PriceRegistrationRecord[] | null> {
		const records = this.items.filter(
			(record) => record.publicAgency === publicAgency
		);

		if (records.length === 0) {
			return null;
		}

		return records;
	}

	async findByCompanyId(
		companyId: string
	): Promise<PriceRegistrationRecord | null> {
		const record = this.items.find((record) => record.companyId === companyId);

		if (!record) {
			return null;
		}

		return record;
	}

	async create(record: PriceRegistrationRecord): Promise<void> {
		this.items.push(record);
	}

	async update(record: PriceRegistrationRecord): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id.toString() === record.id.toString()
		);

		if (itemIndex >= 0) {
			this.items[itemIndex] = record;
		}
	}
}

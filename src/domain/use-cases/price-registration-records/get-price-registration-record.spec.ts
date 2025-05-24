import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPriceRegistrationRecordsRepository } from "../../../../test/repositories/in-memory-price-registration-records";
import { GetPriceRegistrationRecordUseCase } from "./get-price-registration-record";
import { makePriceRegistrationRecord } from "../../../../test/factories/make-price-registration-record";

let inMemoryPriceRegistrationRecordsRepository: InMemoryPriceRegistrationRecordsRepository;
let sut: GetPriceRegistrationRecordUseCase;

describe("Get Price Registration Record Use Case", () => {
	beforeEach(() => {
		inMemoryPriceRegistrationRecordsRepository =
			new InMemoryPriceRegistrationRecordsRepository();
		sut = new GetPriceRegistrationRecordUseCase(
			inMemoryPriceRegistrationRecordsRepository
		);
	});

	it("should return empty array when no price registration records exist", async () => {
		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.priceRegistrationRecords).toEqual([]);
		}
	});

	it("should return price registration records with their items", async () => {
		const record = makePriceRegistrationRecord();

		await inMemoryPriceRegistrationRecordsRepository.create(record);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.priceRegistrationRecords).toHaveLength(1);
			expect(result.value.priceRegistrationRecords[0]).toEqual({
				id: record.id.toString(),
				publicAgency: record.publicAgency,
				number: record.number,
				year: record.year,
				effectiveDate: record.effectiveDate,
				status: record.status,
				companyId: record.companyId,
				items: record.priceRegistrationRecordItems.map((item) => ({
					id: item.id.toString(),
					priceRegistrationRecordId: record.id.toString(),
					specificProductId: item.specificProductId,
					unitValue: item.unitValue,
					quantity: item.quantity,
					minAdherenceQuantity: item.minAdherenceQuantity,
					maxAdherenceQuantity: item.maxAdherenceQuantity,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt ?? null,
				})),
				createdAt: record.createdAt,
				updatedAt: record.updatedAt ?? null,
			});
		}
	});
});

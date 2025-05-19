import { InMemoryPriceRegistrationRecordsRepository } from "../../../../test/repositories/in-memory-price-registration-records";
import { CreatePriceRegistrationRecordUseCase } from "./create-price-registration-record";
import { makePriceRegistrationRecord } from "../../../../test/factories/make-price-registration-record";
import { makePriceRegistrationRecordItem } from "../../../../test/factories/make-price-registration-record-item";

let inMemoryPriceRegistrationRecordsRepository: InMemoryPriceRegistrationRecordsRepository;
let sut: CreatePriceRegistrationRecordUseCase;

describe("Create Price Registration Record Use Case", () => {
	beforeEach(() => {
		inMemoryPriceRegistrationRecordsRepository =
			new InMemoryPriceRegistrationRecordsRepository();
		sut = new CreatePriceRegistrationRecordUseCase(
			inMemoryPriceRegistrationRecordsRepository
		);
	});

	it("should be able to create a price registration record", async () => {
		const record = makePriceRegistrationRecord();
		const item = makePriceRegistrationRecordItem();

		const result = await sut.execute({
			number: record.number,
			publicAgency: record.publicAgency,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
			items: [
				{
					specificProductId: item.specificProductId,
					unitValue: item.unitValue,
					quantity: item.quantity,
					minAdherenceQuantity: item.minAdherenceQuantity,
					maxAdherenceQuantity: item.maxAdherenceQuantity,
				},
			],
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsRepository.items).toHaveLength(1);
	});

	it("should not be able to create a price registration record with empty items", async () => {
		const record = makePriceRegistrationRecord();

		const result = await sut.execute({
			number: record.number,
			publicAgency: record.publicAgency,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
			items: [],
		});

		expect(result.isLeft()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsRepository.items).toHaveLength(0);
	});

	it("should not be able to create a price registration record with duplicate number", async () => {
		const record = makePriceRegistrationRecord();
		const item = makePriceRegistrationRecordItem();

		await sut.execute({
			number: record.number,
			publicAgency: record.publicAgency,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
			items: [
				{
					specificProductId: item.specificProductId,
					unitValue: item.unitValue,
					quantity: item.quantity,
					minAdherenceQuantity: item.minAdherenceQuantity,
					maxAdherenceQuantity: item.maxAdherenceQuantity,
				},
			],
		});

		const result = await sut.execute({
			number: record.number,
			publicAgency: "Agency 2",
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: "user-2",
			items: [
				{
					specificProductId: item.specificProductId,
					unitValue: item.unitValue,
					quantity: item.quantity,
					minAdherenceQuantity: item.minAdherenceQuantity,
					maxAdherenceQuantity: item.maxAdherenceQuantity,
				},
			],
		});

		expect(result.isLeft()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsRepository.items).toHaveLength(1);
	});
});

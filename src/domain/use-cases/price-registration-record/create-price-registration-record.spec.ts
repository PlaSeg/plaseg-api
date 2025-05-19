import { InMemoryPriceRegistrationRecordsRepository } from "../../../../test/repositories/in-memory-price-registration-records";
import { CreatePriceRegistrationRecordUseCase } from "./create-price-registration-record";
import { makePriceRegistrationRecord } from "../../../../test/factories/make-price-registration-record";
import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";

let inMemoryPriceRegistrationRecordsRepository: InMemoryPriceRegistrationRecordsRepository;
let inMemorySpecificProductsRepository: InMemorySpecificProductsRepository;
let sut: CreatePriceRegistrationRecordUseCase;

describe("Create Price Registration Record Use Case", () => {
	beforeEach(() => {
		inMemoryPriceRegistrationRecordsRepository =
			new InMemoryPriceRegistrationRecordsRepository();
		inMemorySpecificProductsRepository =
			new InMemorySpecificProductsRepository();
		sut = new CreatePriceRegistrationRecordUseCase(
			inMemoryPriceRegistrationRecordsRepository,
			inMemorySpecificProductsRepository
		);
	});

	it("should be able to create a price registration record with items", async () => {
		const specificProduct = makeSpecificProduct();
		await inMemorySpecificProductsRepository.create(specificProduct);

		const record = makePriceRegistrationRecord();

		const result = await sut.execute({
			number: record.number,
			publicAgency: record.publicAgency,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
			items: record.priceRegistrationRecordItems.map((item) => ({
				specificProductId: specificProduct.id.toString(),
				unitValue: item.unitValue,
				quantity: item.quantity,
				minAdherenceQuantity: item.minAdherenceQuantity,
				maxAdherenceQuantity: item.maxAdherenceQuantity,
			})),
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

	it("should not be able to create a price registration record with non-existent specific product", async () => {
		const record = makePriceRegistrationRecord();

		const result = await sut.execute({
			number: record.number,
			publicAgency: record.publicAgency,
			year: record.year,
			effectiveDate: record.effectiveDate,
			status: record.status,
			userId: record.userId,
			items: [
				{
					specificProductId: "non-existent-product",
					unitValue: 100,
					quantity: 1,
					minAdherenceQuantity: 1,
					maxAdherenceQuantity: 10,
				},
			],
		});

		expect(result.isLeft()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsRepository.items).toHaveLength(0);
	});
});

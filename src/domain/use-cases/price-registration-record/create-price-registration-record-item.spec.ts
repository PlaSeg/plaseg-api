import { InMemoryPriceRegistrationRecordsRepository } from "../../../../test/repositories/in-memory-price-registration-records";
import { CreatePriceRegistrationRecordItemUseCase } from "./create-price-registration-record-item";
import { makePriceRegistrationRecord } from "../../../../test/factories/make-price-registration-record";
import { makePriceRegistrationRecordItem } from "../../../../test/factories/make-price-registration-record-item";
import { InMemoryPriceRegistrationRecordsItensRepository } from "../../../../test/repositories/in-memory-price-registration-records-items";
import { InMemorySpecificProductsRepository } from "../../../../test/repositories/in-memory-specific-products-repository";
import { makeSpecificProduct } from "../../../../test/factories/make-specific-product";

let inMemoryPriceRegistrationRecordsItensRepository: InMemoryPriceRegistrationRecordsItensRepository;
let inMemoryPriceRegistrationRecordsRepository: InMemoryPriceRegistrationRecordsRepository;
let inMemorySpecificProductsRepository: InMemorySpecificProductsRepository;
let sut: CreatePriceRegistrationRecordItemUseCase;

describe("Create Price Registration Record Item Use Case", () => {
	beforeEach(() => {
		inMemoryPriceRegistrationRecordsItensRepository =
			new InMemoryPriceRegistrationRecordsItensRepository();
		inMemoryPriceRegistrationRecordsRepository =
			new InMemoryPriceRegistrationRecordsRepository();
		inMemorySpecificProductsRepository =
			new InMemorySpecificProductsRepository();
		sut = new CreatePriceRegistrationRecordItemUseCase(
			inMemoryPriceRegistrationRecordsRepository,
			inMemoryPriceRegistrationRecordsItensRepository,
			inMemorySpecificProductsRepository
		);
	});

	it("should be able to create multiple price registration record items", async () => {
		const priceRegistrationRecord = makePriceRegistrationRecord();
		await inMemoryPriceRegistrationRecordsRepository.create(
			priceRegistrationRecord
		);

		const specificProduct1 = makeSpecificProduct();
		const specificProduct2 = makeSpecificProduct();
		await inMemorySpecificProductsRepository.create(specificProduct1);
		await inMemorySpecificProductsRepository.create(specificProduct2);

		const item1 = makePriceRegistrationRecordItem({
			priceRegistrationRecordId: priceRegistrationRecord.id.toString(),
			specificProductId: specificProduct1.id.toString(),
		});

		const item2 = makePriceRegistrationRecordItem({
			priceRegistrationRecordId: priceRegistrationRecord.id.toString(),
			specificProductId: specificProduct2.id.toString(),
		});

		const result = await sut.execute({
			priceRegistrationRecordId: priceRegistrationRecord.id.toString(),
			items: [
				{
					specificProductId: item1.specificProductId,
					unitValue: item1.unitValue,
					quantity: item1.quantity,
					minAdherenceQuantity: item1.minAdherenceQuantity,
					maxAdherenceQuantity: item1.maxAdherenceQuantity,
				},
				{
					specificProductId: item2.specificProductId,
					unitValue: item2.unitValue,
					quantity: item2.quantity,
					minAdherenceQuantity: item2.minAdherenceQuantity,
					maxAdherenceQuantity: item2.maxAdherenceQuantity,
				},
			],
		});
		console.log(result.value);

		expect(result.isRight()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsItensRepository.items).toHaveLength(
			2
		);
	});

	it("should not be able to create items for a non-existent price registration record", async () => {
		const specificProduct = makeSpecificProduct();
		await inMemorySpecificProductsRepository.create(specificProduct);

		const item = makePriceRegistrationRecordItem({
			specificProductId: specificProduct.id.toString(),
		});

		const result = await sut.execute({
			priceRegistrationRecordId: "non-existent-id",
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
		expect(inMemoryPriceRegistrationRecordsItensRepository.items).toHaveLength(
			0
		);
	});

	it("should not be able to create items with non-existent specific product", async () => {
		const priceRegistrationRecord = makePriceRegistrationRecord();
		await inMemoryPriceRegistrationRecordsRepository.create(
			priceRegistrationRecord
		);

		const item = makePriceRegistrationRecordItem({
			priceRegistrationRecordId: priceRegistrationRecord.id.toString(),
		});

		const result = await sut.execute({
			priceRegistrationRecordId: priceRegistrationRecord.id.toString(),
			items: [
				{
					specificProductId: "non-existent-product",
					unitValue: item.unitValue,
					quantity: item.quantity,
					minAdherenceQuantity: item.minAdherenceQuantity,
					maxAdherenceQuantity: item.maxAdherenceQuantity,
				},
			],
		});

		expect(result.isLeft()).toBe(true);
		expect(inMemoryPriceRegistrationRecordsItensRepository.items).toHaveLength(
			0
		);
	});
});

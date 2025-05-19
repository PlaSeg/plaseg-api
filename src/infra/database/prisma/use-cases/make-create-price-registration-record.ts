import { CreatePriceRegistrationRecordUseCase } from "../../../../domain/use-cases/price-registration-record/create-price-registration-record";
import { PrismaPriceRegistrationRecordsRepository } from "../repositories/prisma-price-registration-records-repository";
import { PrismaSpecificProductsRepository } from "../repositories/prisma-specific-product-repository";

export function makeCreatePriceRegistrationRecordUseCase() {
	const priceRegistrationRecordsRepository =
		new PrismaPriceRegistrationRecordsRepository();
	const specificProductsRepository = new PrismaSpecificProductsRepository();

	const useCase = new CreatePriceRegistrationRecordUseCase(
		priceRegistrationRecordsRepository,
		specificProductsRepository
	);

	return useCase;
}

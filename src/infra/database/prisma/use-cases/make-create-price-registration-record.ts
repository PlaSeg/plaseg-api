import { CreatePriceRegistrationRecordUseCase } from "../../../../domain/use-cases/price-registration-record/create-price-registration-record";
import { PrismaPriceRegistrationRecordsRepository } from "../repositories/prisma-price-registration-records-repository";

export function makeCreatePriceRegistrationRecordUseCase() {
	const priceRegistrationRecordsRepository =
		new PrismaPriceRegistrationRecordsRepository();
	const useCase = new CreatePriceRegistrationRecordUseCase(
		priceRegistrationRecordsRepository
	);

	return useCase;
}

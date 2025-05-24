import { GetPriceRegistrationRecordUseCase } from "../../../../domain/use-cases/price-registration-records/get-price-registration-record";
import { PrismaPriceRegistrationRecordsRepository } from "../repositories/prisma-price-registration-records-repository";

export function makeGetPriceRegistrationRecordUseCase() {
	const priceRegistrationRecordsRepository =
		new PrismaPriceRegistrationRecordsRepository();

	const useCase = new GetPriceRegistrationRecordUseCase(
		priceRegistrationRecordsRepository
	);

	return useCase;
}

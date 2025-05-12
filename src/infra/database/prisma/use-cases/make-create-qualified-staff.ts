import { CreateQualifiedStaffUseCase } from "../../../../domain/use-cases/create-qualified-staff";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";
import { PrismaQualifiedStaffRepository } from "../repositories/prisma-qualified-staffs-repository";

export function makeCreateQualifiedStaffUseCase() {
	const QualifiedStaffsRepository = new PrismaQualifiedStaffRepository();
	const MunicipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new CreateQualifiedStaffUseCase(
		QualifiedStaffsRepository,
		MunicipalitiesRepository
	);

	return useCase;
}

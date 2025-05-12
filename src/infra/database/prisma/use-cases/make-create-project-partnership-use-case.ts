import { CreateProjectPartnershipUseCase } from "../../../../domain/use-cases/create-project-partnership";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";
import { PrismaProjectPartnershipsRepository } from "../repositories/prisma-project-partnerships-repository";

export function makeCreateProjectPartnershipUseCase() {
	const QualifiedStaffsRepository = new PrismaProjectPartnershipsRepository();
	const MunicipalitiesRepository = new PrismaMunicipalityRepository();
	const useCase = new CreateProjectPartnershipUseCase(
		QualifiedStaffsRepository,
		MunicipalitiesRepository
	);

	return useCase;
}

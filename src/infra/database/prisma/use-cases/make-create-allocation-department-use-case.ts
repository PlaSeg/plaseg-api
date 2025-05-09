import { CreateAllocationDepartmentUseCase } from "../../../../domain/use-cases/create-allocation-department";
import { PrismaAllocationDepartmentsRepository } from "../repositories/prisma-allocation-department-repository";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeCreateAllocationDepartmentUseCase() {
	const allocationDepartmentsRepository = new PrismaAllocationDepartmentsRepository();
	const municipalitiesRepository = new PrismaMunicipalityRepository();

	const useCase = new CreateAllocationDepartmentUseCase(
		allocationDepartmentsRepository,
		municipalitiesRepository
	);

	return useCase;
}

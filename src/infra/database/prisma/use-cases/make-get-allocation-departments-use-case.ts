import { GetAllocationDepartmentsUseCase } from "../../../../domain/use-cases/municipalities/get-allocation-departments";
import { PrismaMunicipalityRepository } from "../repositories/prisma-municipalities-repository";

export function makeGetAllocationDepartmentsUseCase() {
    const municipalitiesRepository = new PrismaMunicipalityRepository();

    const useCase = new GetAllocationDepartmentsUseCase(municipalitiesRepository)

    return useCase;
}

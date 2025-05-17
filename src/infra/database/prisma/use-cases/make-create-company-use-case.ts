import { CreateCompanyUseCase } from "../../../../domain/use-cases/companies/create-company";
import { PrismaCompanyRepository } from "../repositories/prisma-company-repository";

export function makeCreateCompanyUseCase() {
    const CompaniesRepository = new PrismaCompanyRepository();
    const useCase = new CreateCompanyUseCase(CompaniesRepository);

    return useCase;
}

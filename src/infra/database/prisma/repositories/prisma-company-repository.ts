import { Company } from "../../../../domain/entities/company";
import { CompaniesRepository } from "../../../../domain/repositories/companies-repository";
import { PrismaCompanyMapper } from "../mappers/prisma-company-mapper";
import { prisma } from "../prisma";

export class PrismaCompanyRepository implements CompaniesRepository {
    async findById(id: string): Promise<Company | null> {
        const company = await prisma.company.findUnique({
            where: {
                id,
            }
        });

        if (!company) {
            return null;
        }

        return PrismaCompanyMapper.toDomain(company);
    }

    async findByCnpj(cnpj: string): Promise<Company | null> {
        const company = await prisma.company.findFirst({
            where: {
                cnpj,
            }
        });

        if (!company) {
            return null;
        }

        return PrismaCompanyMapper.toDomain(company);
    }

    async findByUserId(userId: string): Promise<Company | null> {
        const company = await prisma.company.findFirst({
            where: {
                userId,
            }
        });

        if (!company) {
            return null;
        }

        return PrismaCompanyMapper.toDomain(company);
    }

    async create(company: Company): Promise<void> {
        const data = PrismaCompanyMapper.toPrisma(company);

        await prisma.company.create({
            data,
        });
    }
}

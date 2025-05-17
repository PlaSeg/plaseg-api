import { Prisma, Company as PrismaCompany } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Company } from "../../../../domain/entities/company";
import { Email } from "../../../../domain/entities/value-objects/email";

export class PrismaCompanyMapper {
	static toDomain(raw: PrismaCompany): Company {
		return Company.create(
            {
                userId: raw.userId,
				cnpj: raw.cnpj,
				legalName: raw.legalName,
                tradeName: raw.tradeName,
                address: raw.address,
                email: Email.create(raw.email),
                phone: raw.phone,
                site: raw.site,
                portfolioDescription: raw.portfolioDescription,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id)
		);
	}

	static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
		return {
			userId: company.userId,
			cnpj: company.cnpj,
			legalName: company.legalName,
			tradeName: company.tradeName,
			address: company.address,
			email: company.email.toString(),
			phone: company.phone,
			site: company.site,
			portfolioDescription: company.portfolioDescription
		};
	}
}

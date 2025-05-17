import { Company } from "../../src/domain/entities/company";
import { Email } from "../../src/domain/entities/value-objects/email";
import { randomUUID } from "crypto";

export function makeCompany(override: Partial<Company> = {}): Company {
	return Company.create({
		userId: randomUUID(),
		cnpj: "12345678901234",
		legalName: "Acme Inc",
		tradeName: "Acme",
		address: "123 Main St",
		email: Email.create("acme@example.com"),
		phone: "1234567890",
		site: "https://acme.com",
		portfolioDescription: "A great company",
		...override,
	});
}

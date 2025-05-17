import { Company } from "../../src/domain/entities/company";
import { CompaniesRepository } from "../../src/domain/repositories/companies-repository";

export class InMemoryCompaniesRepository implements CompaniesRepository {
	public items: Company[] = [];

	async findById(id: string): Promise<Company | null> {
		const company = this.items.find((item) => item.id.toString() === id);

		if (!company) {
			return null;
		}

		return company;
	}

	async findByUserId(userId: string): Promise<Company | null> {
		const company = this.items.find((item) => item.userId === userId);

		if (!company) {
			return null;
		}

		return company;
	}

	async findByCnpj(cnpj: string): Promise<Company | null> {
		const company = this.items.find((item) => item.cnpj === cnpj);

		if (!company) {
			return null;
		}

		return company;
	}

	async create(company: Company): Promise<void> {
		this.items.push(company);
	}
}

import { Company } from "../entities/company";

export interface CompaniesRepository {
    findById(id: string): Promise<Company | null>;
    findByUserId(userId: string): Promise<Company | null>;
    findByCnpj(name: string): Promise<Company | null>;
    create(municipality: Company): Promise<void>;
}

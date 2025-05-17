import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Company } from "../../entities/company";
import { Email } from "../../entities/value-objects/email";
import { CompaniesRepository } from "../../repositories/companies-repository";


type CreateCompanyUseCaseRequest = {
    userId: string;
    cnpj: string;
    legalName: string;
    tradeName: string;
    address: string;
    email: string;
    phone: string;
    site: string;
    portfolioDescription: string;
};

type CreateCompanyUseCaseResponse = Either<CustomError, null>;

export class CreateCompanyUseCase {
	constructor(private companyRepository: CompaniesRepository) {}

	async execute(
		data: CreateCompanyUseCaseRequest
	): Promise<CreateCompanyUseCaseResponse> {
		const doesCompanyAlreadyExist =
			await this.companyRepository.findByUserId(data.userId);

		if (doesCompanyAlreadyExist) {
			return left(
				new CustomError(409, "Empresa já cadastrada para esse usuário!")
			);
		}
		
		const company = Company.create({
            ...data,
            email: Email.create(data.email)
		});

		await this.companyRepository.create(company);

		return right(null);
	}
}

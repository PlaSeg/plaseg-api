
import { CreateCompanyUseCase } from "./create-company";
import { makeCompany } from "../../../../test/factories/make-company";
import { CustomError } from "../../../core/errors/custom-error";
import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";

let companiesRepository: InMemoryCompaniesRepository;
let sut: CreateCompanyUseCase;

describe("Create Company Use Case", () => {
	beforeEach(() => {
		companiesRepository = new InMemoryCompaniesRepository();
		sut = new CreateCompanyUseCase(companiesRepository);
	});

	it("should be able to create a company", async () => {
		const company = makeCompany();

		const result = await sut.execute({
			userId: company.userId,
			cnpj: company.cnpj,
			legalName: company.legalName,
			tradeName: company.tradeName,
			address: company.address,
			email: company.email.toString(),
			phone: company.phone,
			site: company.site,
			portfolioDescription: company.portfolioDescription,
		});

		expect(result.isRight()).toBe(true);
		expect(companiesRepository.items).toHaveLength(1);
		expect(companiesRepository.items[0]).toEqual(
			expect.objectContaining({
				userId: company.userId,
				cnpj: company.cnpj,
				legalName: company.legalName,
				tradeName: company.tradeName,
				address: company.address,
				email: company.email,
				phone: company.phone,
				site: company.site,
				portfolioDescription: company.portfolioDescription,
			})
		);
	});

	it("should not be able to create a company for a user that already has one", async () => {
		const company = makeCompany();

		await sut.execute({
			userId: company.userId,
			cnpj: company.cnpj,
			legalName: company.legalName,
			tradeName: company.tradeName,
			address: company.address,
			email: company.email.toString(),
			phone: company.phone,
			site: company.site,
			portfolioDescription: company.portfolioDescription,
		});

		const result = await sut.execute({
			userId: company.userId,
			cnpj: "12345678901234",
			legalName: "Another Company",
			tradeName: "Another Trade Name",
			address: "Another Address",
			email: "another@email.com",
			phone: "1234567890",
			site: "https://another.com",
			portfolioDescription: "Another Description",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(CustomError);
		expect(result.value).toEqual(
			expect.objectContaining({
				statusCode: 409,
				message: "Empresa já cadastrada para esse usuário!",
			})
		);
		expect(companiesRepository.items).toHaveLength(1);
	});
});

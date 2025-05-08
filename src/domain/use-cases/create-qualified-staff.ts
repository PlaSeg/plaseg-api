
import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { QualifiedStaff } from "../entities/qualified-staff";
import { EmploymentType } from "../entities/value-objects/employment-type";
import { MunicipalitiesRepository } from "../repositories/municipalities-repository";
import { QualifiedStaffsRepository } from "../repositories/qualified-staffs-repository";

type CreateQualifiedStaffUseCaseRequest = {
    name: string;
    sector: string;
    education: string;
    experience: string;
    employmentType: string;
    document: string;
    isResponsible: boolean;
    userId: string;
};

type CreateQualifiedStaffUseCaseResponse = Either<CustomError, null>;

export class CreateQualifiedStaffUseCase {
	constructor(private qualifiedStaffRepository: QualifiedStaffsRepository, 
				private municipalityRepository: MunicipalitiesRepository
	) {}

	async execute(
		data: CreateQualifiedStaffUseCaseRequest
	): Promise<CreateQualifiedStaffUseCaseResponse> {
		const doesQualifiedStaffAlreadyExist =
			await this.qualifiedStaffRepository.findByDocument(data.document);

		if (doesQualifiedStaffAlreadyExist) {
			return left(
				new CustomError(409, "Gestão qualificada já cadastrada!")
			);
		}

		const municipality = await this.municipalityRepository.findByUserId(data.userId);

		if (!municipality) {
			return left(
				new CustomError(404, "Cadastre um município antes de cadastrar uma gestão qualificada!")
			);
		}

		const qualifiedStaff = QualifiedStaff.create({
			...data,
			employmentType: EmploymentType.create(data.employmentType),
			municipalityId: municipality.id.toString()
		});

		await this.qualifiedStaffRepository.create(qualifiedStaff);

		return right(null);
	}
}
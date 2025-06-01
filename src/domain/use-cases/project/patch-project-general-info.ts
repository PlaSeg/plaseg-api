import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { ProjectsRepository } from "../../repositories/project-repository";

type PatchProjectGeneralInfoUseCaseRequest = {
	projectId: string;
	responsibleCpf?: string;
	responsibleName?: string;
	responsibleEmail?: string;
	responsiblePhone?: string;
	counterpartCapitalItem?: string;
	counterpartCapitalValue?: number;
	counterpartOperatingCostCode?: string;
	counterpartOperatingCostValue?: number;
	totalValue?: number;
	requestedValue?: number;
	baseValue?: number;
};

type PatchProjectGeneralInfoUseCaseResponse = Either<CustomError, null>;

export class PatchProjectGeneralInfoUseCase {
	constructor(private projectRepository: ProjectsRepository) {}

	async execute(
		request: PatchProjectGeneralInfoUseCaseRequest
	): Promise<PatchProjectGeneralInfoUseCaseResponse> {
		const projectExists = await this.projectRepository.findById(
			request.projectId
		);

		if (!projectExists) {
			return left(new CustomError(404, "Projeto não encontrado!"));
		}

		await this.projectRepository.updateGeneralInfo(request.projectId, {
			responsibleCpf: request.responsibleCpf,
			responsibleName: request.responsibleName,
			responsibleEmail: request.responsibleEmail,
			responsiblePhone: request.responsiblePhone,
			counterpartCapitalItem: request.counterpartCapitalItem,
			counterpartCapitalValue: request.counterpartCapitalValue,
			counterpartOperatingCostCode: request.counterpartOperatingCostCode,
			counterpartOperatingCostValue: request.counterpartOperatingCostValue,
			totalValue: request.totalValue,
			requestedValue: request.requestedValue,
			baseValue: request.baseValue,
		});

		return right(null);
	}
}

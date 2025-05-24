import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { ProjectType } from "../../entities/project-type";
import { buildFieldTree, validateFlatFields } from "../../helpers/field-helper";
import { ProjectTypesRepository } from "../../repositories/project-type-repository";

type FieldRequest = {
	id: string;
	name: string;
	value?: string;
	parentId?: string;
};

type CreateProjectTypeUseCaseRequest = {
	name: string;
	fields: FieldRequest[];
};

type CreateProjectTypeUseCaseResponse = Either<CustomError, null>;

export class CreateProjectTypeUseCase {
	constructor(private projectTypeRepository: ProjectTypesRepository) {}

	async execute(
		data: CreateProjectTypeUseCaseRequest
	): Promise<CreateProjectTypeUseCaseResponse> {
		const validateFields = validateFlatFields(data.fields);

		if (validateFields.isLeft()) {
			return validateFields;
		}

		const doesProjectTypeExists = await this.projectTypeRepository.findByName(data.name);

		if (doesProjectTypeExists) {
			return left(new CustomError(409, "O tipo de projeto com esse nome já existe!"))
		}

		const fields = buildFieldTree(data.fields);

		const projectType = ProjectType.create({
			name: data.name,
			fields,
		});

		await this.projectTypeRepository.create(projectType);

		return right(null);
	}
}

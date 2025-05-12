import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Type } from "../../entities/type";
import {
	DomainTypeGroup,
	TypeGroup,
} from "../../entities/value-objects/type-group";
import { TypesRepository } from "../../repositories/types-repository";

type CreateTypeRequest = {
	description: string;
	group: string;
	parentId?: string;
};

type CreateTypeUseCaseResponse = Either<CustomError, null>;

export class CreateTypeUseCase {
	constructor(private typeRepository: TypesRepository) {}

	async execute(
		request: CreateTypeRequest
	): Promise<CreateTypeUseCaseResponse> {
		const doesTypeAlreadyExist = await this.typeRepository.findByDescription(
			request.description
		);

		if (doesTypeAlreadyExist) {
			return left(new CustomError(409, "Tipo já cadastrado"));
		}

		if (request.parentId) {
			const newTypeGroup = TypeGroup.create(request.group);

			if (newTypeGroup.getValue() === DomainTypeGroup.CATEGORY) {
				return left(
					new CustomError(409, "Uma categoria não pode ter um tipo pai.")
				);
			}

			const parentType = await this.typeRepository.findById(request.parentId);

			if (!parentType) {
				return left(new CustomError(409, "Este tipo pai não existe!"));
			}

			if (
				parentType.group.getValue() === DomainTypeGroup.CATEGORY &&
				newTypeGroup.getValue() !== DomainTypeGroup.SUBCATEGORY
			) {
				return left(
					new CustomError(409, "Uma categoria só pode ser pai de subcategorias")
				);
			}

			if (
				parentType.group.getValue() === DomainTypeGroup.SUBCATEGORY &&
				newTypeGroup.getValue() !== DomainTypeGroup.SUBSUBCATEGORY
			) {
				return left(
					new CustomError(
						409,
						"Uma subcategoria só pode ser pai de subsubcategorias."
					)
				);
			}
		}

		const type = Type.create({
			...request,
			group: TypeGroup.create(request.group),
		});

		await this.typeRepository.create(type);

		return right(null);
	}
}

import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { Type } from "../entities/type";
import {
	DomainTypeGroup,
	TypeGroup,
} from "../entities/value-objects/type-group";
import { TypesRepository } from "../repositories/type-repository";

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
			return left(new CustomError(409, "Categoria já cadastrada"));
		}

		if (request.parentId) {
			const parentType = await this.typeRepository.findById(request.parentId);
			const requestGroup = TypeGroup.create(request.group);

			if (requestGroup.getValue() === DomainTypeGroup.CATEGORY) {
				return left(new CustomError(409, "Categoria não deve ter pai."));
			}

			if (!parentType) {
				return left(new CustomError(409, "Esse pai não existe!"));
			}

			if (
				parentType?.group.getValue() === DomainTypeGroup.CATEGORY &&
				requestGroup.getValue() !== DomainTypeGroup.SUBCATEGORY
			) {
				return left(
					new CustomError(409, "Você está cadatrando o pai como uma categoria.")
				);
			}

			if (
				parentType?.group.getValue() === DomainTypeGroup.SUBCATEGORY &&
				requestGroup.getValue() !== DomainTypeGroup.SUBSUBCATEGORY
			) {
				return left(
					new CustomError(
						409,
						"Você está cadastrando o pai como uma subcategoria."
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

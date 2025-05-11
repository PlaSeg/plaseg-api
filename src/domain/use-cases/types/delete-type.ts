import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { TypesRepository } from "../../repositories/type-repository";

type DeleteTypeRequest = {
	id: string;
};

type DeleteTypeUseCaseResponse = Either<CustomError, null>;

export class DeleteTypeUseCase {
	constructor(private typeRepository: TypesRepository) {}

	async execute(
		request: DeleteTypeRequest
	): Promise<DeleteTypeUseCaseResponse> {
		const type = await this.typeRepository.findById(request.id);

		if (!type) {
			return left(new CustomError(404, "Tipo não encontrado"));
		}

		const allTypes = await this.typeRepository.findMany();

		if (allTypes) {
			const hasChildren = allTypes.some((t) => t.parentId === request.id);

			if (hasChildren) {
				return left(
					new CustomError(
						409,
						"Não é possível excluir um tipo que possui subtipos"
					)
				);
			}
		}

		await this.typeRepository.delete(request.id);

		return right(null);
	}
}

import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { TypeGroup } from "../entities/value-objects/type-group";
import { TypesRepository } from "../repositories/type-repository";

type GetTypesByGroupParentIdUseCaseRequest = {
	group: string;
	parentId?: string;
};

type TypeResponse = {
	id: string;
	description: string;
	group: string;
	parentId?: string;
	createdAt: Date;
	updatedAt?: Date | null;
};

type GetTypesByGroupParentIdUseCaseResponse = Either<
	CustomError,
	{
		types: TypeResponse[] | null;
	}
>;

export class GetTypesByGroupParentIdUseCase {
	constructor(private typesRepository: TypesRepository) {}

	async execute({
		group,
		parentId,
	}: GetTypesByGroupParentIdUseCaseRequest): Promise<GetTypesByGroupParentIdUseCaseResponse> {
		const requestGroup = TypeGroup.create(group);

		const types = await this.typesRepository.findByGroupAndParentId(
			requestGroup,
			parentId
		);

		if (!types) {
			return left(new CustomError(404, "Não existem mais tipos."));
		}

		const typesResponse = types.map((t) => ({
			id: t.id.toString(),
			description: t.description,
			group: t.group.getValue(),
			parentId: t.parentId,
			createdAt: t.createdAt,
			updatedAt: t.updatedAt,
		}));

		return right({types: typesResponse});
	}
}

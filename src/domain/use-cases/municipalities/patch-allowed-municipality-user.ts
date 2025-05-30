import { Either, left, right } from "../../../core/types/either";
import { UsersRepository } from "../../repositories/users-repository";
import { CustomError } from "../../../core/errors/custom-error";
import { DomainRole } from "../../entities/value-objects/role";

type PatchMunicipalityUserUseCaseRequest = {
	userId: string;
};

type PatchMunicipalityUserUseCaseResponse = Either<CustomError, null>;

export class PatchMunicipalityUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: PatchMunicipalityUserUseCaseRequest): Promise<PatchMunicipalityUserUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			return left(new CustomError(404, "User not found"));
		}

		if (user.role.getValue() !== DomainRole.MUNICIPALITY) {
			return left(
				new CustomError(
					400,
					"Apenas usuários município podem ter seu status de permitido alterado"
				)
			);
		}

		await this.usersRepository.updateAllowed(userId);

		return right(null);
	}
}

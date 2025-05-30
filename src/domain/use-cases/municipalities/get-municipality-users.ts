import { Either, right } from "../../../core/types/either";
import { UsersRepository } from "../../repositories/users-repository";
import { User } from "../../entities/user";

type GetMunicipalityUsersUseCaseResponse = Either<
	null,
	{
		users: User[];
	}
>;

export class GetMunicipalityUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<GetMunicipalityUsersUseCaseResponse> {
		const users = await this.usersRepository.findManyMunicipalityUsers();

		return right({ users });
	}
}

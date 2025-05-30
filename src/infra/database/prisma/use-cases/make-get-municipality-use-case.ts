import { GetMunicipalityUsersUseCase } from "../../../../domain/use-cases/municipalities/get-municipality-users";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

export function makeGetMunicipalityUsersUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new GetMunicipalityUsersUseCase(usersRepository);

	return useCase;
}

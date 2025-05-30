import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { PatchMunicipalityUserUseCase } from "../../../../domain/use-cases/municipalities/patch-allowed-municipality-user";

export function makePatchMunicipalityUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new PatchMunicipalityUserUseCase(usersRepository);

	return useCase;
}

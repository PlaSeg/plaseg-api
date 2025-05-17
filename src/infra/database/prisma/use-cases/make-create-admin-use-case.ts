import { PrismaUsersRepository } from "../repositories/prisma-users-repository";
import { BcryptAdapter } from "../../../adapters/bcrypt-adapter";
import { CreateAdminUseCase } from "../../../../domain/use-cases/admin/create-admin";

export function makeCreateAdminUseCase() {
	const UsersRepository = new PrismaUsersRepository();
	const hashGenerator = new BcryptAdapter(6);

	const useCase = new CreateAdminUseCase(UsersRepository, hashGenerator);

	return useCase;
}

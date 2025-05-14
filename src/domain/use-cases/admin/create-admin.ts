import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { HashGenerator } from "../../cryptography/hash-generator";
import { User } from "../../entities/user";
import { Email } from "../../entities/value-objects/email";
import { Role, DomainRole } from "../../entities/value-objects/role";
import { UsersRepository } from "../../repositories/users-repository";

type CreateAdminUseCaseRequest = {
	// Dados do usuário admin a ser criado
	name: string;
	email: string;
	phone: string;
	document: string;
	password: string;

	// Dados do usuário que está fazendo a requisição (admin-master)
	requesterId: string;
};

type CreateAdminUseCaseResponse = Either<
	CustomError,
	{
		admin: User;
	}
>;

export class CreateAdminUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute(
		request: CreateAdminUseCaseRequest
	): Promise<CreateAdminUseCaseResponse> {
		// Verificar se o usuário solicitante existe e é um admin-master
		const requester = await this.usersRepository.findById(request.requesterId);

		if (!requester) {
			return left(new CustomError(404, "Usuário adm master não encontrado"));
		}

		// Verificação se o solicitante tem permissão para criar admins
		if (requester.role.getValue() !== DomainRole.ADMIN_MASTER) {
			return left(new CustomError(403, "Acesso negado"));
		}

		// Verificar se já existe um usuário com este email
		const doesEmailAlreadyExist = await this.usersRepository.findByEmail(
			request.email
		);

		if (doesEmailAlreadyExist) {
			return left(new CustomError(409, "Email já cadastrado"));
		}

		// Verificar se já existe um usuário com este documento
		const doesDocumentAlreayExist = await this.usersRepository.findByDocument(
			request.document
		);

		if (doesDocumentAlreayExist) {
			return left(new CustomError(409, ["Documento já cadastrado"]));
		}

		// Gerar hash da senha
		const hashedPassword = await this.hashGenerator.hash(request.password);

		// Criar instância do usuário admin
		const admin = User.create({
			name: request.name,
			email: Email.create(request.email),
			phone: request.phone,
			document: request.document,
			password: hashedPassword,
			role: Role.admin(),
		});

		// Registrar a criação do usuário admin no banco de dados
		await this.usersRepository.create(admin);

		return right({
			admin,
		});
	}
}

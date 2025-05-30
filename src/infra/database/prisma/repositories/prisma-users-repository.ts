import { UsersRepository } from "../../../../domain/repositories/users-repository";
import { prisma } from "../prisma";
import { User } from "../../../../domain/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { DomainRole } from "../../../../domain/entities/value-objects/role";

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				phone,
			},
		});

		if (!user) {
			return null;
		}

		return PrismaUserMapper.toDomain(user);
	}

	async findManyAdmins(): Promise<User[]> {
		const admins = await prisma.user.findMany({
			where: {
				role: DomainRole.ADMIN,
			},
		});

		return admins.map(PrismaUserMapper.toDomain);
	}

	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.create({
			data,
		});
	}

	async findManyMunicipalityUsers(): Promise<User[]> {
		const users = await prisma.user.findMany({
			where: {
				role: DomainRole.MUNICIPALITY,
			},
		});

		return users.map(PrismaUserMapper.toDomain);
	}
}

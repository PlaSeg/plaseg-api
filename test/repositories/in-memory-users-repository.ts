import { UsersRepository } from "../../src/domain/repositories/users-repository";
import { User } from "../../src/domain/entities/user";
import { DomainRole } from "../../src/domain/entities/value-objects/role";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	async findById(id: string): Promise<User | null> {
		const user = this.items.find((user) => user.id.toString() === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((user) => user.email.toString() === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = this.items.find((user) => user.document === document);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = this.items.find((user) => user.phone === phone);

		if (!user) {
			return null;
		}

		return user;
	}

	async findManyAdmins(): Promise<User[]> {
		return this.items.filter(
			(user) => user.role.getValue() === DomainRole.ADMIN
		);
	}

	async findManyMunicipalityUsers(): Promise<User[]> {
		return this.items.filter(
			(user) => user.role.getValue() === DomainRole.MUNICIPALITY
		);
	}

	async create(user: User): Promise<void> {
		this.items.push(user);
	}

	async updateAllowed(userId: string): Promise<true | null> {
		const user = this.items.find((user) => user.id.toString() === userId);

		if (!user) {
			return null;
		}

		user.allowed = !user.allowed;

		return true;
	}
}

import { User } from "../entities/user";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByDocument(document: string): Promise<User | null>;
	findManyAdmins(): Promise<User[]>;
	create(user: User): Promise<void>;
}

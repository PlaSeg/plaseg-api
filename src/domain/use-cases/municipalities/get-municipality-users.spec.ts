import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { GetMunicipalityUsersUseCase } from "./get-municipality-users";
import { makeUser } from "../../../../test/factories/make-user";
import { Role } from "../../entities/value-objects/role";
import { Email } from "../../entities/value-objects/email";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetMunicipalityUsersUseCase;

describe("Get Municipality Users Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		sut = new GetMunicipalityUsersUseCase(inMemoryUsersRepository);
	});

	it("should be able to get all municipality users", async () => {
		const municipality1 = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality1@example.com"),
			document: "12345678903",
		});

		const municipality2 = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality2@example.com"),
			document: "12345678902",
		});

		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
			document: "12345678901",
		});

		await inMemoryUsersRepository.create(municipality1);
		await inMemoryUsersRepository.create(municipality2);
		await inMemoryUsersRepository.create(admin);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.users).toHaveLength(2);
			expect(result.value.users).toEqual([municipality1, municipality2]);
		}
	});

	it("should return empty array when no municipality users are found", async () => {
		const admin = makeUser({
			role: Role.admin(),
			email: Email.create("admin@example.com"),
		});

		await inMemoryUsersRepository.create(admin);

		const result = await sut.execute();

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.users).toHaveLength(0);
			expect(result.value.users).toEqual([]);
		}
	});
});

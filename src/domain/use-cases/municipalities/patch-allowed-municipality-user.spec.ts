import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../../../../test/repositories/in-memory-users-repository";
import { PatchMunicipalityUserUseCase } from "./patch-allowed-municipality-user";
import { makeUser } from "../../../../test/factories/make-user";
import { Role } from "../../entities/value-objects/role";
import { Email } from "../../entities/value-objects/email";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: PatchMunicipalityUserUseCase;

describe("Patch Municipality User Allowed Status Use Case", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		sut = new PatchMunicipalityUserUseCase(inMemoryUsersRepository);
	});

	it("should be able to toggle municipality user allowed status", async () => {
		const municipality = makeUser({
			role: Role.municipality(),
			email: Email.create("municipality@example.com"),
			document: "12345678903",
			allowed: false,
		});

		await inMemoryUsersRepository.create(municipality);

		const result = await sut.execute({
			userId: municipality.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(municipality.allowed).toBe(true);
	});

	it("should return error when user is not found", async () => {
		const result = await sut.execute({
			userId: "non-existent-id",
		});

		expect(result.isLeft()).toBeTruthy();
		if (result.isLeft()) {
			expect(result.value.statusCode).toBe(404);
			expect(result.value.message).toBe("User not found");
		}
	});
});

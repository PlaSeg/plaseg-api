import { Role, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export const users = [
	{
		name: "Admin Master",
		phone: "11999999999",
		document: "12345678900",
		email: "adminmaster@plaseg.com",
		password: "00000000",
		role: Role.ADMIN_MASTER,
	},
	{
		name: "Admin",
		phone: "11988888888",
		document: "98765432100",
		email: "admin@plaseg.com",
		password: "00000000",
		role: Role.ADMIN,
	},
];

export async function seedUsers(prisma: PrismaClient) {
	console.log("🌱 Seeding users...");

	for (const user of users) {
		await prisma.user.create({
			data: {
				...user,
				password: await hash(user.password, 6),
			},
		});
	}

	console.log("✅ Users seeded successfully");
}

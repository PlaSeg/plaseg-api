import { Role, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
	console.log("🌱 Seeding users...");

	await prisma.user.create({
		data: {
			name: "Admin Master",
			phone: "11999999999",
			document: "12345678900",
			email: "adminmaster@plaseg.com",
			password: await hash("00000000", 6),
			role: Role.ADMIN_MASTER,
		},
	});

	await prisma.user.create({
		data: {
			name: "Admin",
			phone: "11988888888",
			document: "98765432100",
			email: "admin@plaseg.com",
			password: await hash("00000000", 6),
			role: Role.ADMIN,
		},
	});

	console.log("✅ Users seeded successfully");
}

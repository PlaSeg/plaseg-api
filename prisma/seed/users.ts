import { Role, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export const users = [
	{
		name: "Acme",
		phone: "11999999999",
		document: "12345678900",
		email: "admplaseg@plaseg.com",
		password: "TJIS123@",
		role: Role.ADMIN_MASTER,
	},
	{
		name: "Admin Support",
		email: "support@example.com",
		phone: "11988888888",
		document: "98765432100",
		password: "support123",
		role: Role.ADMIN,
	},
	{
		name: "Admin Finance",
		email: "finance@example.com",
		phone: "11977777777",
		document: "45678912300",
		password: "finance123",
		role: Role.ADMIN,
	},
	{
		name: "Admin Operations",
		email: "operations@example.com",
		phone: "11966666666",
		document: "78912345600",
		password: "operations123",
		role: Role.ADMIN,
	},
	{
		name: "Admin HR",
		email: "hr@example.com",
		phone: "11955555555",
		document: "32165498700",
		password: "hr123",
		role: Role.ADMIN,
	},
	{
		name: "Carlos Silva",
		email: "saopaulo@municipality.com",
		phone: "11944444444",
		document: "11122233344",
		password: "municipality123",
		role: Role.MUNICIPALITY,
	},
	{
		name: "Ana Santos",
		email: "rio@municipality.com",
		phone: "21944444444",
		document: "22233344455",
		password: "municipality123",
		role: Role.MUNICIPALITY,
	},
	{
		name: "João Oliveira",
		email: "belohorizonte@municipality.com",
		phone: "31944444444",
		document: "33344455566",
		password: "municipality123",
		role: Role.MUNICIPALITY,
	},
	{
		name: "Maria Costa",
		email: "portoalegre@municipality.com",
		phone: "51944444444",
		document: "44455566677",
		password: "municipality123",
		role: Role.MUNICIPALITY,
	},
	{
		name: "Pedro Ferreira",
		email: "salvador@municipality.com",
		phone: "71944444444",
		document: "55566677788",
		password: "municipality123",
		role: Role.MUNICIPALITY,
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

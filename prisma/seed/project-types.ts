import { PrismaClient } from "@prisma/client";

export const projectTypes = [
	{
		name: "Segurança Pública",
	},
	{
		name: "Tecnologia",
	},
	{
		name: "Infraestrutura",
	},
];

export async function seedProjectTypes(prisma: PrismaClient) {
	console.log("🌱 Seeding project types...");

	// First, clean up existing project types
	await prisma.projectType.deleteMany();

	// Create project types
	for (const projectType of projectTypes) {
		await prisma.projectType.create({
			data: projectType,
		});
	}

	console.log("✅ Project types seeded successfully");
}

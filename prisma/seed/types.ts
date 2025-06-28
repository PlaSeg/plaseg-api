import { TypeGroup, PrismaClient } from "@prisma/client";

export async function seedTypes(prisma: PrismaClient) {
	console.log("🌱 Seeding types...");

	await prisma.type.create({
		data: {
			description: "Armas de Fogo",
			group: TypeGroup.CATEGORY,
			children: {
				create: [
					{
						description: "Pistolas",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Pistola Glock 9mm",
									group: TypeGroup.CATEGORY,
								},
							],
						},
					},
				],
			},
		},
	});

	await prisma.type.create({
		data: {
			description: "Veículos",
			group: TypeGroup.CATEGORY,
			children: {
				create: [
					{
						description: "Viaturas",
						group: TypeGroup.CATEGORY,
					},
				],
			},
		},
	});

	await prisma.type.create({
		data: {
			description: "Edital",
			group: TypeGroup.OPPORTUNITY,
		},
	});

	console.log("✅ Types seeded successfully");
}

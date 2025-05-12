import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
	await prisma.opportunity.deleteMany();
	await prisma.type.deleteMany();

	await prisma.type.create({
		data: {
			description: "Armas de Fogo",
			group: "CATEGORY",
			children: {
				create: [
					{
						description: "Pistola Glock",
						group: "SUBCATEGORY",
						children: {
							create: [
								{
									description: "Pistola Glock 9mm",
									group: "SUBSUBCATEGORY",
								},
							],
						},
					},
					{
						description: "Metralhadora",
						group: "SUBCATEGORY",
					},
				],
			},
		},
	});

	await prisma.type.create({
		data: {
			description: "Edital",
			group: "OPPORTUNITY",
		},
	});

	console.log("Seed complete");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seed/users";
import { seedTypes } from "./seed/types";
import { seedOpportunities } from "./seed/opportunities";
import { seedBaseProducts } from "./seed/base-products";
import { seedProjects } from "./seed/projects";

const prisma = new PrismaClient();

async function seed() {
	console.log("🚀 Starting seed process...");
	console.log("🧹 Cleaning existing data...");
	await prisma.project.deleteMany();
	await prisma.opportunity.deleteMany();
	await prisma.baseProduct.deleteMany();
	await prisma.type.deleteMany();
	await prisma.user.deleteMany();
	await prisma.company.deleteMany();
	await prisma.specificProduct.deleteMany();
	await prisma.priceRegistrationRecord.deleteMany();

	await seedUsers(prisma);

	const { editalId, weaponId } = await seedTypes(prisma);

	await seedOpportunities(prisma, editalId);

	await seedBaseProducts(prisma, weaponId);

	await seedProjects(prisma, editalId);

	console.log("🎉 Seed process completed successfully!");
}

seed()
	.catch((e) => {
		console.error("❌ Seed process failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

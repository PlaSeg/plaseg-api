import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seed/users";
import { seedTypes } from "./seed/types";
import { seedOpportunity } from "./seed/opportunity";
import { seedProjectType } from "./seed/project-type";
import { seedMunicipality } from "./seed/municipality";
import { seedOpportunityProjectType } from "./seed/opportunity-project-type";
import { seedBaseProducts } from "./seed/base-products";

async function clearDatabase() {
	const tablenames =
		await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

	for (const { tablename } of tablenames as { tablename: string }[]) {
		if (tablename !== "_prisma_migrations") {
			await prisma.$executeRawUnsafe(
				`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`
			);
		}
	}
}

const prisma = new PrismaClient();

async function seed() {
	console.log("🚀 Starting seed process...");
	console.log("🧹 Cleaning existing data...");

	await clearDatabase();

	await seedUsers(prisma);
	await seedMunicipality(prisma);
	await seedTypes(prisma);
	await seedOpportunity(prisma);
	await seedProjectType(prisma);
	await seedOpportunityProjectType(prisma);
	await seedBaseProducts(prisma);

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

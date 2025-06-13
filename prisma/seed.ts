import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seed/users";
import { seedTypes } from "./seed/types";
import { seedOpportunities } from "./seed/opportunities";
import { seedBaseProducts } from "./seed/base-products";
import { seedProjects } from "./seed/projects";

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

	const { editalId, weaponId } = await seedTypes(prisma);

	await seedBaseProducts(prisma, weaponId);

	const { opportunity, projectType } = await seedOpportunities(
		prisma,
		editalId
	);

	await seedProjects(prisma, opportunity.id, projectType.id);

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

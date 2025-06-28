import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seed/users";
import { seedTypes } from "./seed/types";
import { seedOpportunity } from "./seed/opportunities";
import { seedProjectType } from "./seed/project-types";
import { seedMunicipality } from "./seed/municipality";

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

	const { editalId } = await seedTypes(prisma);

	const opportunity = await seedOpportunity(prisma, editalId);

	const projectType = await seedProjectType(prisma);

	await prisma.opportunityProjectType.create({
		data: {
			opportunityId: opportunity.id,
			projectTypeId: projectType.id,
		},
	});

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

import { PrismaClient } from "@prisma/client";

export async function seedOpportunityProjectType(prisma: PrismaClient) {
	console.log("🌱 Seeding opportunity–project-type...");

	const opportunityType = await prisma.projectType.findFirst({
		where: {
			name: "Combate à Violência Contra a Mulher",
		},
	});

	if (!opportunityType) {
		throw new Error("Opportunity type not found");
	}

	const opportunity = await prisma.opportunity.findFirst({
		where: {
			title: "Combate à Violência Contra a Mulher",
		},
	});

	if (!opportunity) {
		throw new Error("Opportunity not found");
	}

	await prisma.opportunityProjectType.create({
		data: {
			opportunityId: opportunity.id,
			projectTypeId: opportunityType.id,
		},
	});

	console.log("✅ Opportunity–project-type seeded successfully");
}

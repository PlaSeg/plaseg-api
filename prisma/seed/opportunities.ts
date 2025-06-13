import { Slug } from "../../src/domain/entities/value-objects/slug";
import { PrismaClient } from "@prisma/client";

export async function seedOpportunities(prisma: PrismaClient, typeId: string) {
	console.log("🌱 Seeding opportunities...");

	const opportunity = await prisma.opportunity.create({
		data: {
			title: "Combate à Violência Contra a Mulher",
			slug: Slug.createFromText("Combate à Violência Contra a Mulher").value,
			responsibleAgency: "Prefeitura Municipal",
			description:
				"Este programa visa fortalecer a segurança pública municipal através de investimentos estratégicos em capacitação e equipamentos para a Guarda Municipal. A iniciativa busca modernizar as operações e aumentar a eficiência do patrulhamento preventivo.\n\nO projeto inclui a aquisição de equipamentos de última geração, treinamento especializado para os agentes e implementação de sistemas integrados de gestão. A meta é reduzir índices de criminalidade e melhorar a resposta a incidentes em áreas críticas do município.",
			typeId: typeId,
			availableValue: 1000000,
			minValue: 800000,
			maxValue: 1000000,
			initialDeadline: "2025-05-12T18:00:28.044Z",
			finalDeadline: "2025-05-12T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 100,
			isActive: true,
			releasedForAll: false,
			documents: {
				create: [
					{
						name: "Justificativa Completa do Projeto",
						fields: {
							create: [
								{
									name: "Informações gerais",
									value: null,
								},
							],
						},
					},
				],
			},
		},
	});

	const projectType = await prisma.projectType.upsert({
		where: { name: opportunity.title },
		update: {},
		create: {
			name: opportunity.title,
			documents: {
				create: [
					{
						name: "Justificativa Completa do Projeto",
						fields: {
							create: [
								{
									name: "Informações gerais",
									value:
										"No Brasil, a violência contra a mulher é uma triste realidade. Segundo o Atlas da Violência 2021, elaborado pelo IPEA (Instituto de Pesquisa Econômica Aplicada) em parceria com o Fórum Brasileiro de Segurança Pública, em 2019 foram registrados mais de 180 mil casos de violência doméstica e familiar contra a mulher, sendo que cerca de 85% das vítimas conheciam o agressor.",
								},
							],
						},
					},
				],
			},
		},
	});

	await prisma.opportunityProjectType.create({
		data: {
			opportunityId: opportunity.id,
			projectTypeId: projectType.id,
		},
	});

	console.log("✅ Opportunities seeded successfully");

	return { opportunity, projectType };
}

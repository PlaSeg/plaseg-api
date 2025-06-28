import { Slug } from "../../src/domain/entities/value-objects/slug";
import { PrismaClient } from "@prisma/client";

export async function seedOpportunity(prisma: PrismaClient, typeId: string) {
	console.log("🌱 Seeding opportunity...");

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
			counterpartPercentage: 20,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Declaração de Contrapartida Municipal",
						description:
							"Documento oficial assinado pelo prefeito municipal declarando o comprometimento em aportar contrapartida financeira ou em bens e serviços equivalente a no mínimo 20% do valor total do projeto, conforme legislação vigente.",
						model:
							"https://www.gov.br/esporte/pt-br/noticias-e-conteudos/esporte/ministerio-lanca-edital-para-projetos-relativos-ao-programa-vida-saudavel/AnexoIIIModelodaDeclaraodeContrapartida.pdf",
					},
				],
			},
			documents: {
				create: [
					{
						name: "Justificativa Completa do Projeto",
						fields: {
							createMany: {
								data: [
									{
										name: "Informações Gerais",
									},
									{
										id: "5e6f9912-61f1-490a-92b8-73d420ec6438",
										name: "Justificativa",
									},
									{
										name: "Caracterização dos interesses recíprocos",
										parentId: "5e6f9912-61f1-490a-92b8-73d420ec6438",
									},
									{
										name: "Indicação do público alvo",
										parentId: "5e6f9912-61f1-490a-92b8-73d420ec6438",
									},
								],
							},
						},
					},
				],
			},
		},
		include: {
			documents: true,
		},
	});

	console.log("✅ Opportunity seeded successfully");

	return opportunity;
}

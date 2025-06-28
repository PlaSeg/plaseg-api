import { Slug } from "../../src/domain/entities/value-objects/slug";
import { PrismaClient } from "@prisma/client";

export async function seedOpportunity(prisma: PrismaClient) {
	console.log("🌱 Seeding opportunity...");

	const opportunityType = await prisma.type.findUnique({
		where: {
			description: "Edital",
		},
	});

	if (!opportunityType) {
		throw new Error("Opportunity type not found");
	}

	const opportunity = await prisma.opportunity.create({
		data: {
			title: "Combate à Violência Contra a Mulher",
			slug: Slug.createFromText("Combate à Violência Contra a Mulher").value,
			responsibleAgency: "Prefeitura Municipal",
			description:
				"Este programa visa fortalecer a segurança pública municipal através de investimentos estratégicos em capacitação e equipamentos para a Guarda Municipal. A iniciativa busca modernizar as operações e aumentar a eficiência do patrulhamento preventivo.\n\nO projeto inclui a aquisição de equipamentos de última geração, treinamento especializado para os agentes e implementação de sistemas integrados de gestão. A meta é reduzir índices de criminalidade e melhorar a resposta a incidentes em áreas críticas do município.",
			typeId: opportunityType.id,
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
		},
	});

	const doc1 = await prisma.document.create({
		data: {
			name: "Justificativa Completa do Projeto",
			opportunityId: opportunity.id,
		},
	});

	const justificativaField = await prisma.field.create({
		data: {
			name: "Justificativa",
			documentId: doc1.id,
		},
	});

	await prisma.field.createMany({
		data: [
			{
				name: "Informações Gerais",
				documentId: doc1.id,
			},
			{
				name: "Caracterização dos interesses recíprocos",
				documentId: doc1.id,
				parentId: justificativaField.id,
			},
			{
				name: "Indicação do público alvo",
				documentId: doc1.id,
				parentId: justificativaField.id,
			},
		],
	});

	const doc2 = await prisma.document.create({
		data: {
			name: "Sustentabilidade e Localização de Bens do Projeto",
			opportunityId: opportunity.id,
		},
	});

	const sustentabilidadeField = await prisma.field.create({
		data: {
			name: "Sustentabilidade",
			documentId: doc2.id,
		},
	});

	await prisma.field.createMany({
		data: [
			{
				name: "Manutenção própria da sua frota de veículos",
				documentId: doc2.id,
				parentId: sustentabilidadeField.id,
			},
			{
				name: "Condições para o abastecimento das viaturas a serem adquiridas",
				documentId: doc2.id,
				parentId: sustentabilidadeField.id,
			},
		],
	});

	await prisma.document.create({
		data: {
			name: "Declaração de Contrapartida",
			opportunityId: opportunity.id,
			fields: {
				createMany: {
					data: [
						{
							name: "Rubrica orçamentária (capital)",
						},
						{
							name: "Valor",
						},
					],
				},
			},
		},
	});

	console.log("✅ Opportunity seeded successfully");

	return opportunity;
}

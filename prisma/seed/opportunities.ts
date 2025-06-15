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
					},
				],
			},
		},
		include: {
			documents: true,
		},
	});

	const document = opportunity.documents[0];

	const justificativaField = await prisma.field.create({
		data: {
			name: "Justificativa",
			value: null,
			documentId: document.id,
		},
	});

	await prisma.field.createMany({
		data: [
			{
				name: "Informações gerais",
				value: null,
				documentId: document.id,
			},
			{
				name: "Caracterização dos interesses recíprocos",
				value: null,
				documentId: document.id,
				parentId: justificativaField.id,
			},
			{
				name: "Relação entre a proposta e os objetivos e diretrizes do programa federal",
				value: null,
				documentId: document.id,
				parentId: justificativaField.id,
			},
		],
	});

	const projectType = await prisma.projectType.create({
		data: {
			name: opportunity.title,
			documents: {
				create: [
					{
						name: "Justificativa Completa do Projeto",
					},
				],
			},
		},
		include: {
			documents: true,
		},
	});

	const projectTypeDocument = projectType.documents[0];

	const projectTypeJustificativaField = await prisma.field.create({
		data: {
			name: "Justificativa",
			value: null,
			documentId: projectTypeDocument.id,
		},
	});

	await prisma.field.createMany({
		data: [
			{
				name: "Informações gerais",
				value:
					"No Brasil, a violência contra a mulher é uma triste realidade. Segundo o Atlas da Violência 2021, elaborado pelo IPEA (Instituto de Pesquisa Econômica Aplicada) em parceria com o Fórum Brasileiro de Segurança Pública, em 2019 foram registrados mais de 180 mil casos de violência doméstica e familiar contra a mulher, sendo que cerca de 85% das vítimas conheciam o agressor.",
				documentId: projectTypeDocument.id,
				parentId: projectTypeJustificativaField.id,
			},
			{
				name: "Caracterização dos interesses recíprocos",
				value:
					"O objeto da presente proposta está em consonância com preceitos constitucionais e demais normativos vigentes que preconizam a integração e a atuação coordenada dos órgãos de segurança pública na prevenção e no combate à violência, especialmente a violência contra a mulher.",
				documentId: projectTypeDocument.id,
				parentId: projectTypeJustificativaField.id,
			},
			{
				name: "Relação entre a proposta e os objetivos e diretrizes do programa federal",
				value:
					"Ação 21BQ - Implementação de Políticas de Segurança Pública, Prevenção, e Enfrentamento à Criminalidade",
				documentId: projectTypeDocument.id,
				parentId: projectTypeJustificativaField.id,
			},
		],
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

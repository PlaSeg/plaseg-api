import { PrismaClient } from "@prisma/client";

export async function seedOpportunity(prisma: PrismaClient) {
	const serviceType = await prisma.type.findFirst({
		where: { group: "OPPORTUNITY" },
	});

	if (!serviceType) {
		throw new Error("Tipo SERVICE não encontrado");
	}

	await prisma.opportunity.create({
		data: {
			title: "Combate à Violência Contra a Mulher",
			slug: "combate-violencia-contra-mulher",
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Programa de apoio aos municípios para implementação de ações de combate à violência contra a mulher através da aquisição de equipamentos e capacitação de equipes.",
			availableValue: 500000.0,
			minValue: 50000.0,
			maxValue: 200000.0,
			initialDeadline: new Date("2025-07-01"),
			finalDeadline: new Date("2025-12-31"),
			requiresCounterpart: true,
			counterpartPercentage: 15.0,
			isActive: true,
			releasedForAll: true,
			allBaseProducts: false,
			typeId: serviceType.id,
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
										id: "d7436c99-2937-4326-8c84-f648c0782078",
										name: "Justificativa",
									},
									{
										name: "Caracterização dos interesses recíprocos",
										parentId: "d7436c99-2937-4326-8c84-f648c0782078",
									},
									{
										name: "Indicação do público alvo",
										parentId: "d7436c99-2937-4326-8c84-f648c0782078",
									},
								],
							},
						},
					},
					{
						name: "Sustentabilidade e Localização de Bens do Projeto",
						fields: {
							createMany: {
								data: [
									{
										id: "8afd3344-f62d-45b0-be54-4693d6334caa",
										name: "Sustentabilidade",
									},
									{
										name: "Manutenção própria da sua frota de veículos",
										parentId: "8afd3344-f62d-45b0-be54-4693d6334caa",
									},
									{
										name: "Condições para o abastecimento das viaturas a serem adquiridas",
										parentId: "8afd3344-f62d-45b0-be54-4693d6334caa",
									},
								],
							},
						},
					},
					{
						name: "Declaração de Contrapartida",
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
				],
			},
		},
	});
}

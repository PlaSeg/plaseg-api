import { PrismaClient } from "@prisma/client";

async function createProjectType(prisma: PrismaClient) {
	await prisma.projectType.deleteMany();
	return await prisma.projectType.create({
		data: {
			name: "Projeto de Segurança Pública",
			documents: {
				create: [
					{
						name: "Proposta Técnica",
						fields: {
							create: [
								{
									name: "Objetivos",
									value: "Objetivos do projeto",
								},
								{
									name: "Metodologia",
									value: "Metodologia do projeto",
								},
							],
						},
					},
					{
						name: "Plano de Capacitação",
						fields: {
							create: [
								{
									name: "Cursos",
									value: "Lista de cursos",
								},
								{
									name: "Carga Horária",
									value: "Carga horária total",
								},
							],
						},
					},
				],
			},
		},
	});
}

export const projects = (projectTypeId: string, opportunityId: string, municipalityId: string) => {
	return [
		{
			title: "Modernização da Guarda Municipal de São Paulo",
			responsibleName: "João Silva",
			responsibleEmail: "joao.silva@saopaulo.gov.br",
			responsiblePhone: "11999999999",
			responsibleCpf: "12345678900",
			totalValue: 800000,
			counterpartCapitalValue: 800000,
			projectTypeId: projectTypeId,
			opportunityId: opportunityId,
			municipalityId: municipalityId,
			documents: {
				create: [
					{
						name: "Proposta Técnica",
						fields: {
							create: [
								{
									name: "Objetivos",
									value:
										"Modernizar a estrutura operacional da Guarda Municipal",
								},
								{
									name: "Metodologia",
									value: "Implementação gradual com treinamento contínuo",
								},
							],
						},
					},
					{
						name: "Plano de Capacitação",
						fields: {
							create: [
								{
									name: "Cursos",
									value:
										"Gestão de Crises, Mediação de Conflitos, Direitos Humanos",
								},
								{
									name: "Carga Horária",
									value: "120 horas",
								},
							],
						},
					},
				],
			},
		},
		{
			title: "Sistema Integrado de Monitoramento Urbano",
			responsibleName: "Maria Santos",
			responsibleEmail: "maria.santos@saopaulo.gov.br",
			responsiblePhone: "11988888888",
			responsibleCpf: "98765432100",
			totalValue: 500000,
			counterpartCapitalValue: 250000,
			projectTypeId: projectTypeId,
			opportunityId: opportunityId,
			municipalityId: municipalityId,
			documents: {
				create: [
					{
						name: "Proposta Técnica",
						fields: {
							create: [
								{
									name: "Objetivos",
									value:
										"Implementar sistema de câmeras e sensores inteligentes",
								},
								{
									name: "Metodologia",
									value: "Instalação em fases com integração gradual",
								},
							],
						},
					},
					{
						name: "Plano de Implementação",
						fields: {
							create: [
								{
									name: "Fases",
									value: "3 fases de 4 meses cada",
								},
								{
									name: "Áreas Prioritárias",
									value: "Centro, Zona Leste e Zona Sul",
								},
							],
						},
					},
				],
			},
		},
	];
};

export async function seedProjects(
	prisma: PrismaClient,
	opportunityId: string
) {
	console.log("🌱 Seeding projects...");

	const user = await prisma.user.create({
		data: {
			name: "João Silva Santos",
			email: "joao.silva@prefeitura.gov.br",
			document: "12345678901",
			phone: "(11) 99999-8888",
			password: "$2b$10$hashedPasswordExample123",
			role: "ADMIN",
			allowed: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const municipality = await prisma.municipality.create({
		data: {
			name: "São José dos Campos",
			guardInitialDate: new Date("2024-01-15"),
			guardCount: 150,
			trafficInitialDate: new Date("2024-02-01"),
			trafficCount: 45,
			federativeUnit: "SP",
			unitType: "MUNICIPALITY",
			userId: user.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	// Criar uma oportunidade de exemplo
	const opportunity = await prisma.opportunity.create({
		data: {
			title: "Oportunidade de Exemplo",
			slug: "oportunidade-de-exemplo",
			responsibleAgency: "Agência Exemplo",
			description: "Descrição da oportunidade",
			availableValue: 1000000,
			minValue: 100000,
			maxValue: 1000000,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: false,
			typeId: opportunityId,
			documents: {
				create: [
					{
						name: "Proposta Técnica",
						fields: {
							create: [
								{
									name: "Objetivos",
									value: "Objetivos da oportunidade",
								},
								{
									name: "Metodologia",
									value: "Metodologia da oportunidade",
								},
							],
						},
					},
					{
						name: "Plano de Capacitação",
						fields: {
							create: [
								{
									name: "Cursos",
									value: "Cursos da oportunidade",
								},
								{
									name: "Carga Horária",
									value: "Carga horária da oportunidade",
								},
							],
						},
					},
				],
			},
		},
	});

	const projectType = await createProjectType(prisma);

	for (const project of projects(projectType.id, opportunity.id, municipality.id)) {
		await prisma.project.create({
			data: project,
		});
	}

	console.log("✅ Projects seeded successfully");
}

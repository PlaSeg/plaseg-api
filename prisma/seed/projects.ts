import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export async function seedProjects(
	prisma: PrismaClient,
	opportunityId: string,
	projectTypeId: string
) {
	console.log("🌱 Seeding projects...");

	const user = await prisma.user.create({
		data: {
			name: "Municipio",
			email: "municipio@plaseg.com",
			document: "12345678901",
			phone: "11976769999",
			password: await hash("00000000", 6),
			role: "MUNICIPALITY",
			allowed: true,
		},
	});

	const municipality = await prisma.municipality.create({
		data: {
			name: "Teresina",
			guardInitialDate: new Date("2024-01-15"),
			guardCount: 10,
			trafficInitialDate: new Date("2024-02-01"),
			trafficCount: 10,
			federativeUnit: "PI",
			unitType: "MUNICIPALITY",
			userId: user.id,
		},
	});

	await prisma.project.create({
		data: {
			title: "Combate à Violência Contra a Mulher em Teresina",
			responsibleName: "Municipio",
			responsibleEmail: "municipio@plaseg.com",
			responsiblePhone: "11976769999",
			responsibleCpf: "12345678901",
			totalValue: 800000,
			counterpartCapitalValue: null,
			projectTypeId: projectTypeId,
			opportunityId: opportunityId,
			municipalityId: municipality.id,
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

	console.log("✅ Projects seeded successfully");
}

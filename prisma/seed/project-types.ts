import { PrismaClient } from "@prisma/client";

export async function seedProjectType(prisma: PrismaClient) {
	console.log("🌱 Seeding project type...");

	const projectType = await prisma.projectType.create({
		data: {
			name: "Combate à Violência Contra a Mulher",
			documents: {
				create: [
					{
						name: "Justificativa Completa do Projeto",
						fields: {
							createMany: {
								data: [
									{
										name: "Informações Gerais",
										value:
											"No Brasil, a violência contra a mulher é uma triste realidade. Segundo o Atlas da Violência 2021, elaborado pelo IPEA (Instituto de Pesquisa Econômica Aplicada) em parceria com o Fórum Brasileiro de Segurança Pública, em 2019 foram registrados mais de 180 mil casos de violência doméstica e familiar contra a mulher, sendo que cerca de 85% das vítimas conheciam o agressor.",
									},
									{
										id: "d7436c99-2937-4326-8c84-f648c0782078",
										name: "Justificativa",
									},
									{
										name: "Caracterização dos interesses recíprocos",
										value:
											"O objeto da presente proposta está em consonância com preceitos constitucionais e demais normativos vigentes que preconizam a integração e a atuação coordenada dos órgãos de segurança pública na prevenção e no combate à violência, especialmente a violência contra a mulher.",
										parentId: "d7436c99-2937-4326-8c84-f648c0782078",
									},
									{
										name: "Indicação do público alvo",
										value:
											"O público alvo direto é a população feminina do Município de Caxias, já o indireto é a População da cidade e a guarda Municipal Civil de Caxias",
										parentId: "d7436c99-2937-4326-8c84-f648c0782078",
									},
								],
							},
						},
					},
				],
			},
		},
	});

	console.log("✅ Project type seeded successfully");

	return projectType;
}

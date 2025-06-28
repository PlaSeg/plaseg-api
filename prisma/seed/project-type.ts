import { PrismaClient } from "@prisma/client";

export async function seedProjectType(prisma: PrismaClient) {
	await prisma.projectType.create({
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
										value:
											"A Prefeitura Municipal de Caxias-MA, bem como a Secretaria Municipal de Segurança e a Guarda Municipal de Caxias, possuem setores próprios de transportes, responsável por prestar serviços técnicos continuados de manutenção preventiva e corretiva de veículos leves e pesados, além de parcerias e contratos vigentes com prestação de serviços incluindo a reposição de peças, serviços de reboque, mecânica, retífica de motores, caixa de diferencial, bombas e bicos injetores, hidráulica, lanternagem, pintura, alinhamento e balanceamento de rodas, troca de óleo, lubrificação, regulagem eletrônica de motor, serviços elétricos, tapeçaria e/ou capotaria, vidraçaria, climatização, instalação, instalação de acessórios, lavagem, e borracharia e aquisição de lubrificantes, fluidos e aditivos, para a frota de veículos, conforme Contrato nº 001 da Ata de Registro de Preços 022/2021, firmado com a Empresa PAULO RIZIEIRO DO N. TORRES COMÉRCIO - ME, para prestação e serviços de alinhamento, balanceamento e calibragem de pneus da frota, além de manutenções.",
										parentId: "8afd3344-f62d-45b0-be54-4693d6334caa",
									},
									{
										name: "Condições para o abastecimento das viaturas a serem adquiridas",
										value:
											"A Guarda Municipal de Caxias, que será diretamente beneficiada com as aquisições do presente instrumento, possui em seu corpo técnico, servidores capacitados e equipamentos capazes de diligenciar, no que couber, as demandas relacionadas a necessidades técnicas de adequação, substituição, ou mesmo conserto dos equipamentos a serem adquiridos. Além disso, a Prefeitura Municipal possui amplo histórico de contratos firmados com os mais diversos fornecedores do país, garantindo assim, um excelente relacionamento com todos os sujeitos envolvidos desde a fabricação, até a possível necessidade de manutenção e assistência das mesmas. Vale ressaltar, que já há planos para treinamento especializado para manuseio das Armas de Incapacitação Neuromuscular, o que envolverá cuidados preventivos de manuseio que podem preservar ou ampliar a vida útil do bem. Além disso, o setor de almoxarifado possui plenas condições de armazenar as armas não letais.",
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
										value: "449052",
									},
									{
										name: "Valor",
										value:
											"R$27.172,60 (VINTE E SETE MIL CENTO E SETENTA E DOIS REAIS E SESSENTA CENTAVOS) ",
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

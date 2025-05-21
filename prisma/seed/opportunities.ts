import { Slug } from "../../src/domain/entities/value-objects/slug";

export const opportunities = (typeId: string) => {
	return [
		{
			title: "Fomento à Segurança Pública Municipal",
			slug: Slug.createFromText("Fomento à Segurança Pública Municipal").value,
			responsibleAgency: "Prefeitura Municipal de São Paulo",
			description:
				"Capacitação da Guarda Municipal; Aquisição de Equipamentos.",
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
			requiredDocuments: {
				create: {
					name: "Proposta Técnica",
					description: "Proposta técnica para o edital",
					model: "http://www.example.com/proposta-tecnica.pdf",
				},
			},
		},
		{
			title: "Modernização do Sistema de Videomonitoramento",
			slug: Slug.createFromText("Modernização do Sistema de Videomonitoramento")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Ampliação da rede de câmeras; Implementação de software de reconhecimento facial.",
			availableValue: 800000,
			minValue: 600000,
			typeId: typeId,
			maxValue: 800000,
			initialDeadline: "2025-06-15T18:00:28.044Z",
			finalDeadline: "2025-07-15T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 80,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Plano de Implantação",
					description:
						"Plano detalhado de implantação do sistema de videomonitoramento",
					model: "http://www.example.com/plano-implantacao.pdf",
				},
			},
		},
		{
			title: "Integração dos Sistemas de Segurança",
			slug: Slug.createFromText("Integração dos Sistemas de Segurança").value,
			responsibleAgency: "Departamento de Tecnologia da Informação",
			description:
				"Integração entre sistemas municipais, estaduais e federais; Criação de central unificada.",
			availableValue: 900000,
			minValue: 700000,
			typeId: typeId,
			maxValue: 900000,
			initialDeadline: "2025-05-30T18:00:28.044Z",
			finalDeadline: "2025-06-30T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 70,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Estudo de Viabilidade Técnica",
					description:
						"Estudo detalhado sobre a viabilidade técnica da integração",
					model: "http://www.example.com/estudo-viabilidade.pdf",
				},
			},
		},
		{
			title: "Programa de Prevenção à Violência nas Escolas",
			slug: Slug.createFromText("Programa de Prevenção à Violência nas Escolas")
				.value,
			responsibleAgency: "Secretaria de Educação",
			description:
				"Capacitação de educadores; Implementação de atividades extracurriculares; Monitoramento escolar.",
			availableValue: 500000,
			minValue: 300000,
			typeId: typeId,
			maxValue: 500000,
			initialDeadline: "2025-07-01T18:00:28.044Z",
			finalDeadline: "2025-08-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 50,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Projeto Pedagógico",
					description:
						"Projeto pedagógico das atividades de prevenção à violência",
					model: "http://www.example.com/projeto-pedagogico.pdf",
				},
			},
		},
		{
			title: "Implementação de Iluminação Pública Inteligente",
			slug: Slug.createFromText(
				"Implementação de Iluminação Pública Inteligente"
			).value,
			responsibleAgency: "Secretaria de Infraestrutura",
			description:
				"Modernização da iluminação em áreas críticas; Integração com sistema de segurança.",
			availableValue: 750000,
			minValue: 500000,
			typeId: typeId,
			maxValue: 750000,
			initialDeadline: "2025-06-10T18:00:28.044Z",
			finalDeadline: "2025-07-10T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 60,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Mapeamento de Áreas Críticas",
					description:
						"Estudo de mapeamento das áreas críticas para implementação prioritária",
					model: "http://www.example.com/mapeamento-areas.pdf",
				},
			},
		},
		{
			title: "Aquisição de Viaturas para Patrulhamento",
			slug: Slug.createFromText("Aquisição de Viaturas para Patrulhamento")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Compra de viaturas equipadas; Implementação de sistema de gestão de frota.",
			availableValue: 1200000,
			minValue: 900000,
			typeId: typeId,
			maxValue: 1200000,
			initialDeadline: "2025-05-20T18:00:28.044Z",
			finalDeadline: "2025-06-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 75,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Especificação Técnica de Veículos",
					description:
						"Documento com especificações técnicas detalhadas dos veículos a serem adquiridos",
					model: "http://www.example.com/especificacao-veiculos.pdf",
				},
			},
		},
		{
			title: "Criação de Centro de Controle e Operações",
			slug: Slug.createFromText("Criação de Centro de Controle e Operações")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Construção de centro integrado; Aquisição de equipamentos de monitoramento avançado.",
			availableValue: 1500000,
			minValue: 1200000,
			typeId: typeId,
			maxValue: 1500000,
			initialDeadline: "2025-07-05T18:00:28.044Z",
			finalDeadline: "2025-08-05T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 90,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Projeto Arquitetônico",
					description:
						"Projeto arquitetônico e estrutural do centro de controle e operações",
					model: "http://www.example.com/projeto-arquitetonico.pdf",
				},
			},
		},
		{
			title: "Capacitação em Inteligência Policial",
			slug: Slug.createFromText("Capacitação em Inteligência Policial").value,
			responsibleAgency: "Academia de Polícia",
			description:
				"Treinamento avançado para agentes; Implementação de metodologias de análise criminal.",
			availableValue: 400000,
			minValue: 300000,
			typeId: typeId,
			maxValue: 400000,
			initialDeadline: "2025-06-01T18:00:28.044Z",
			finalDeadline: "2025-07-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 40,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Programa de Treinamento",
					description:
						"Detalhamento do programa de treinamento em inteligência policial",
					model: "http://www.example.com/programa-treinamento.pdf",
				},
			},
		},
		{
			title: "Sistema de Alerta Comunitário",
			slug: Slug.createFromText("Sistema de Alerta Comunitário").value,
			responsibleAgency: "Secretaria de Inovação e Tecnologia",
			description:
				"Implementação de aplicativo móvel; Criação de rede de comunicação entre comunidade e autoridades.",
			availableValue: 350000,
			minValue: 250000,
			typeId: typeId,
			maxValue: 350000,
			initialDeadline: "2025-05-25T18:00:28.044Z",
			finalDeadline: "2025-06-25T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 30,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Protótipo do Aplicativo",
					description:
						"Protótipo funcional do aplicativo de alerta comunitário",
					model: "http://www.example.com/prototipo-aplicativo.pdf",
				},
			},
		},
		{
			title: "Programa de Ressocialização de Jovens Infratores",
			slug: Slug.createFromText(
				"Programa de Ressocialização de Jovens Infratores"
			).value,
			responsibleAgency: "Secretaria de Assistência Social",
			description:
				"Atividades profissionalizantes; Acompanhamento psicossocial; Integração com mercado de trabalho.",
			availableValue: 600000,
			minValue: 400000,
			typeId: typeId,
			maxValue: 600000,
			initialDeadline: "2025-06-20T18:00:28.044Z",
			finalDeadline: "2025-07-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 65,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: {
					name: "Plano de Ressocialização",
					description:
						"Plano metodológico completo do programa de ressocialização",
					model: "http://www.example.com/plano-ressocializacao.pdf",
				},
			},
		},
	];
};

export const opportunities = (typeId: string) => {
	return [
		{
			title: "Fomento à Segurança Pública Municipal",
			description:
				"Capacitação da Guarda Municipal; Aquisição de Equipamentos.",
			availableValue: 1,
			minValue: 1,
			typeId: typeId,
			maxValue: 1,
			initialDeadline: "2025-05-12T18:00:28.044Z",
			finalDeadline: "2025-05-12T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 100,
			isActive: true,
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
			description:
				"Ampliação da rede de câmeras; Implementação de software de reconhecimento facial.",
			availableValue: 1.5,
			minValue: 1,
			typeId: typeId,
			maxValue: 1.5,
			initialDeadline: "2025-06-15T18:00:28.044Z",
			finalDeadline: "2025-07-15T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 80,
			isActive: true,
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
			description:
				"Integração entre sistemas municipais, estaduais e federais; Criação de central unificada.",
			availableValue: 2,
			minValue: 1.5,
			typeId: typeId,
			maxValue: 2,
			initialDeadline: "2025-05-30T18:00:28.044Z",
			finalDeadline: "2025-06-30T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 70,
			isActive: true,
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
			description:
				"Capacitação de educadores; Implementação de atividades extracurriculares; Monitoramento escolar.",
			availableValue: 0.8,
			minValue: 0.5,
			typeId: typeId,
			maxValue: 0.8,
			initialDeadline: "2025-07-01T18:00:28.044Z",
			finalDeadline: "2025-08-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 50,
			isActive: true,
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
			description:
				"Modernização da iluminação em áreas críticas; Integração com sistema de segurança.",
			availableValue: 1.2,
			minValue: 0.8,
			typeId: typeId,
			maxValue: 1.2,
			initialDeadline: "2025-06-10T18:00:28.044Z",
			finalDeadline: "2025-07-10T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 60,
			isActive: true,
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
			description:
				"Compra de viaturas equipadas; Implementação de sistema de gestão de frota.",
			availableValue: 1.8,
			minValue: 1.2,
			typeId: typeId,
			maxValue: 1.8,
			initialDeadline: "2025-05-20T18:00:28.044Z",
			finalDeadline: "2025-06-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 75,
			isActive: true,
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
			description:
				"Construção de centro integrado; Aquisição de equipamentos de monitoramento avançado.",
			availableValue: 2.5,
			minValue: 2,
			typeId: typeId,
			maxValue: 2.5,
			initialDeadline: "2025-07-05T18:00:28.044Z",
			finalDeadline: "2025-08-05T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 90,
			isActive: true,
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
			description:
				"Treinamento avançado para agentes; Implementação de metodologias de análise criminal.",
			availableValue: 0.9,
			minValue: 0.6,
			typeId: typeId,
			maxValue: 0.9,
			initialDeadline: "2025-06-01T18:00:28.044Z",
			finalDeadline: "2025-07-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 40,
			isActive: true,
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
			description:
				"Implementação de aplicativo móvel; Criação de rede de comunicação entre comunidade e autoridades.",
			availableValue: 0.7,
			minValue: 0.4,
			typeId: typeId,
			maxValue: 0.7,
			initialDeadline: "2025-05-25T18:00:28.044Z",
			finalDeadline: "2025-06-25T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 30,
			isActive: true,
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
			description:
				"Atividades profissionalizantes; Acompanhamento psicossocial; Integração com mercado de trabalho.",
			availableValue: 1.1,
			minValue: 0.7,
			typeId: typeId,
			maxValue: 1.1,
			initialDeadline: "2025-06-20T18:00:28.044Z",
			finalDeadline: "2025-07-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 65,
			isActive: true,
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

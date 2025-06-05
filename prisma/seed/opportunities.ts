import { Slug } from "../../src/domain/entities/value-objects/slug";
import { PrismaClient } from "@prisma/client";

export const opportunities = (typeId: string) => {
	return [
		{
			title: "Fomento à Segurança Pública Municipal",
			slug: Slug.createFromText("Fomento à Segurança Pública Municipal").value,
			responsibleAgency: "Prefeitura Municipal de São Paulo",
			description:
				"Este programa visa fortalecer a segurança pública municipal através de investimentos estratégicos em capacitação e equipamentos para a Guarda Municipal. A iniciativa busca modernizar as operações e aumentar a eficiência do patrulhamento preventivo.\n\nO projeto inclui a aquisição de equipamentos de última geração, treinamento especializado para os agentes e implementação de sistemas integrados de gestão. A meta é reduzir índices de criminalidade e melhorar a resposta a incidentes em áreas críticas do município.",
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
				create: [
					{
						name: "Proposta Técnica",
						description: "Proposta técnica detalhada para o edital",
						model: "http://www.example.com/proposta-tecnica.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Plano detalhado de capacitação dos agentes",
						model: "http://www.example.com/plano-capacitacao.pdf",
					},
					{
						name: "Especificação de Equipamentos",
						description: "Lista detalhada de equipamentos necessários",
						model: "http://www.example.com/especificacao-equipamentos.pdf",
					},
					{
						name: "Cronograma de Implementação",
						description: "Cronograma detalhado das atividades",
						model: "http://www.example.com/cronograma.pdf",
					},
					{
						name: "Orçamento Detalhado",
						description: "Orçamento completo do projeto",
						model: "http://www.example.com/orcamento.pdf",
					},
					{
						name: "Plano de Gestão de Riscos",
						description: "Análise e gestão de riscos do projeto",
						model: "http://www.example.com/gestao-riscos.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Estratégias de monitoramento e avaliação",
						model: "http://www.example.com/monitoramento.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Estratégias de manutenção e sustentabilidade",
						model: "http://www.example.com/sustentabilidade.pdf",
					},
					{
						name: "Certificações e Habilitações",
						description: "Documentos comprobatórios de habilitação",
						model: "http://www.example.com/certificacoes.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência para situações emergenciais",
						model: "http://www.example.com/contingencia.pdf",
					},
				],
			},
		},
		{
			title: "Modernização do Sistema de Videomonitoramento",
			slug: Slug.createFromText("Modernização do Sistema de Videomonitoramento")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Este projeto visa modernizar e expandir o sistema de videomonitoramento da cidade, implementando tecnologias avançadas de vigilância e reconhecimento facial. A iniciativa busca aumentar a cobertura de áreas críticas e melhorar a eficiência do monitoramento.\n\nO sistema incluirá câmeras de alta resolução, software de análise de vídeo em tempo real e integração com outros sistemas de segurança. A meta é criar uma rede inteligente de vigilância que possa prevenir crimes e auxiliar em investigações.",
			typeId: typeId,
			availableValue: 800000,
			minValue: 600000,
			maxValue: 800000,
			initialDeadline: "2025-06-15T18:00:28.044Z",
			finalDeadline: "2025-07-15T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 80,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Plano de Implantação",
						description: "Plano detalhado de implantação do sistema",
						model: "http://www.example.com/plano-implantacao.pdf",
					},
					{
						name: "Especificação Técnica",
						description: "Especificações técnicas do sistema",
						model: "http://www.example.com/especificacao-tecnica.pdf",
					},
					{
						name: "Análise de Impacto",
						description: "Análise de impacto do sistema",
						model: "http://www.example.com/impacto.pdf",
					},
					{
						name: "Plano de Privacidade",
						description: "Políticas de privacidade e proteção de dados",
						model: "http://www.example.com/privacidade.pdf",
					},
					{
						name: "Plano de Manutenção",
						description: "Plano de manutenção preventiva e corretiva",
						model: "http://www.example.com/manutencao.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Plano de treinamento dos operadores",
						model: "http://www.example.com/capacitacao.pdf",
					},
					{
						name: "Plano de Integração",
						description: "Plano de integração com sistemas existentes",
						model: "http://www.example.com/integracao.pdf",
					},
					{
						name: "Plano de Segurança",
						description: "Medidas de segurança do sistema",
						model: "http://www.example.com/seguranca.pdf",
					},
					{
						name: "Plano de Backup",
						description: "Estratégias de backup e recuperação",
						model: "http://www.example.com/backup.pdf",
					},
					{
						name: "Plano de Escalabilidade",
						description: "Plano de expansão futura do sistema",
						model: "http://www.example.com/escalabilidade.pdf",
					},
				],
			},
		},
		{
			title: "Integração dos Sistemas de Segurança",
			slug: Slug.createFromText("Integração dos Sistemas de Segurança").value,
			responsibleAgency: "Departamento de Tecnologia da Informação",
			description:
				"Este projeto visa criar uma plataforma unificada que integre todos os sistemas de segurança municipais, estaduais e federais. A iniciativa busca eliminar silos de informação e melhorar a coordenação entre as diferentes forças de segurança.\n\nA solução incluirá uma central de operações integrada, sistemas de comunicação unificados e ferramentas de análise de dados em tempo real. O objetivo é criar um ambiente colaborativo que permita respostas mais rápidas e eficientes a incidentes de segurança.",
			typeId: typeId,
			availableValue: 900000,
			minValue: 700000,
			maxValue: 900000,
			initialDeadline: "2025-05-30T18:00:28.044Z",
			finalDeadline: "2025-06-30T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 70,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Estudo de Viabilidade Técnica",
						description: "Análise técnica da integração",
						model: "http://www.example.com/viabilidade.pdf",
					},
					{
						name: "Arquitetura do Sistema",
						description: "Documentação da arquitetura",
						model: "http://www.example.com/arquitetura.pdf",
					},
					{
						name: "Plano de Migração",
						description: "Plano de migração dos sistemas",
						model: "http://www.example.com/migracao.pdf",
					},
					{
						name: "Plano de Interoperabilidade",
						description: "Padrões de interoperabilidade",
						model: "http://www.example.com/interoperabilidade.pdf",
					},
					{
						name: "Plano de Governança",
						description: "Modelo de governança do sistema",
						model: "http://www.example.com/governanca.pdf",
					},
					{
						name: "Plano de Segurança",
						description: "Medidas de segurança da integração",
						model: "http://www.example.com/seguranca-sistema.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Treinamento dos usuários",
						model: "http://www.example.com/capacitacao-sistema.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Monitoramento do sistema integrado",
						model: "http://www.example.com/monitoramento-sistema.pdf",
					},
					{
						name: "Plano de Backup",
						description: "Estratégias de backup",
						model: "http://www.example.com/backup-sistema.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência do sistema",
						model: "http://www.example.com/contingencia-sistema.pdf",
					},
				],
			},
		},
		{
			title: "Programa de Prevenção à Violência nas Escolas",
			slug: Slug.createFromText("Programa de Prevenção à Violência nas Escolas")
				.value,
			responsibleAgency: "Secretaria de Educação",
			description:
				"Este programa visa criar um ambiente escolar mais seguro e pacífico através de ações preventivas e educativas. A iniciativa inclui capacitação de educadores, implementação de atividades extracurriculares e monitoramento escolar.\n\nO projeto busca desenvolver habilidades socioemocionais nos alunos, fortalecer a relação entre escola e comunidade, e implementar protocolos de segurança. O objetivo é reduzir índices de violência e criar um ambiente propício ao aprendizado.",
			typeId: typeId,
			availableValue: 500000,
			minValue: 300000,
			maxValue: 500000,
			initialDeadline: "2025-07-01T18:00:28.044Z",
			finalDeadline: "2025-08-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 50,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Projeto Pedagógico",
						description: "Projeto pedagógico das atividades",
						model: "http://www.example.com/projeto-pedagogico.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Plano de capacitação dos educadores",
						model: "http://www.example.com/capacitacao-educadores.pdf",
					},
					{
						name: "Plano de Atividades",
						description: "Cronograma de atividades extracurriculares",
						model: "http://www.example.com/atividades.pdf",
					},
					{
						name: "Protocolos de Segurança",
						description: "Protocolos de segurança escolar",
						model: "http://www.example.com/protocolos.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Sistema de monitoramento escolar",
						model: "http://www.example.com/monitoramento-escolar.pdf",
					},
					{
						name: "Plano de Comunicação",
						description: "Estratégias de comunicação com a comunidade",
						model: "http://www.example.com/comunicacao.pdf",
					},
					{
						name: "Plano de Avaliação",
						description: "Métricas de avaliação do programa",
						model: "http://www.example.com/avaliacao.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade do programa",
						model: "http://www.example.com/sustentabilidade-escolar.pdf",
					},
					{
						name: "Plano de Gestão de Crises",
						description: "Protocolos de gestão de crises",
						model: "http://www.example.com/crises.pdf",
					},
					{
						name: "Plano de Parcerias",
						description: "Estratégias de parcerias com a comunidade",
						model: "http://www.example.com/parcerias.pdf",
					},
				],
			},
		},
		{
			title: "Implementação de Iluminação Pública Inteligente",
			slug: Slug.createFromText(
				"Implementação de Iluminação Pública Inteligente"
			).value,
			responsibleAgency: "Secretaria de Infraestrutura",
			description:
				"Este projeto visa modernizar o sistema de iluminação pública através da implementação de tecnologias inteligentes e sustentáveis. A iniciativa busca melhorar a segurança pública e reduzir custos operacionais.\n\nO sistema incluirá lâmpadas LED com controle remoto, sensores de presença e integração com o sistema de segurança. A meta é criar um ambiente mais seguro e confortável para os cidadãos, além de contribuir para a sustentabilidade ambiental.",
			typeId: typeId,
			availableValue: 750000,
			minValue: 500000,
			maxValue: 750000,
			initialDeadline: "2025-06-10T18:00:28.044Z",
			finalDeadline: "2025-07-10T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 60,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Mapeamento de Áreas Críticas",
						description: "Estudo de áreas prioritárias",
						model: "http://www.example.com/mapeamento-areas.pdf",
					},
					{
						name: "Especificação Técnica",
						description: "Especificações do sistema de iluminação",
						model: "http://www.example.com/especificacao-iluminacao.pdf",
					},
					{
						name: "Plano de Implementação",
						description: "Cronograma de implementação",
						model: "http://www.example.com/implementacao.pdf",
					},
					{
						name: "Plano de Manutenção",
						description: "Plano de manutenção preventiva",
						model: "http://www.example.com/manutencao-iluminacao.pdf",
					},
					{
						name: "Análise de Impacto Ambiental",
						description: "Impacto ambiental do projeto",
						model: "http://www.example.com/impacto-ambiental.pdf",
					},
					{
						name: "Plano de Eficiência Energética",
						description: "Estratégias de eficiência energética",
						model: "http://www.example.com/eficiencia.pdf",
					},
					{
						name: "Plano de Integração",
						description: "Integração com sistemas existentes",
						model: "http://www.example.com/integracao-iluminacao.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Sistema de monitoramento",
						model: "http://www.example.com/monitoramento-iluminacao.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência",
						model: "http://www.example.com/contingencia-iluminacao.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade do projeto",
						model: "http://www.example.com/sustentabilidade-iluminacao.pdf",
					},
				],
			},
		},
		{
			title: "Aquisição de Viaturas para Patrulhamento",
			slug: Slug.createFromText("Aquisição de Viaturas para Patrulhamento")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Este projeto visa modernizar a frota de viaturas da segurança pública através da aquisição de veículos equipados com tecnologia de ponta. A iniciativa busca aumentar a eficiência do patrulhamento e melhorar a resposta a incidentes.\n\nO projeto inclui a aquisição de viaturas adaptadas, implementação de sistema de gestão de frota e treinamento dos operadores. A meta é otimizar o uso dos recursos e aumentar a presença da segurança pública nas ruas.",
			typeId: typeId,
			availableValue: 1200000,
			minValue: 900000,
			maxValue: 1200000,
			initialDeadline: "2025-05-20T18:00:28.044Z",
			finalDeadline: "2025-06-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 75,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Especificação Técnica de Veículos",
						description: "Especificações dos veículos",
						model: "http://www.example.com/especificacao-veiculos.pdf",
					},
					{
						name: "Plano de Gestão de Frota",
						description: "Sistema de gestão de frota",
						model: "http://www.example.com/gestao-frota.pdf",
					},
					{
						name: "Plano de Manutenção",
						description: "Plano de manutenção dos veículos",
						model: "http://www.example.com/manutencao-veiculos.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Treinamento dos operadores",
						model: "http://www.example.com/capacitacao-operadores.pdf",
					},
					{
						name: "Plano de Logística",
						description: "Logística de distribuição",
						model: "http://www.example.com/logistica.pdf",
					},
					{
						name: "Plano de Segurança",
						description: "Medidas de segurança dos veículos",
						model: "http://www.example.com/seguranca-veiculos.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Sistema de monitoramento da frota",
						model: "http://www.example.com/monitoramento-frota.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência operacional",
						model: "http://www.example.com/contingencia-frota.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade da frota",
						model: "http://www.example.com/sustentabilidade-frota.pdf",
					},
					{
						name: "Plano de Renovação",
						description: "Plano de renovação da frota",
						model: "http://www.example.com/renovacao.pdf",
					},
				],
			},
		},
		{
			title: "Criação de Centro de Controle e Operações",
			slug: Slug.createFromText("Criação de Centro de Controle e Operações")
				.value,
			responsibleAgency: "Secretaria de Segurança Pública",
			description:
				"Este projeto visa criar um centro integrado de controle e operações que centralize o monitoramento e a coordenação de todas as ações de segurança pública. A iniciativa busca melhorar a eficiência operacional e a resposta a incidentes.\n\nO centro incluirá sistemas avançados de monitoramento, salas de situação e ferramentas de análise de dados. A meta é criar um ambiente de comando e controle que permita uma gestão mais eficiente da segurança pública.",
			typeId: typeId,
			availableValue: 1500000,
			minValue: 1200000,
			maxValue: 1500000,
			initialDeadline: "2025-07-05T18:00:28.044Z",
			finalDeadline: "2025-08-05T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 90,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Projeto Arquitetônico",
						description: "Projeto arquitetônico do centro",
						model: "http://www.example.com/projeto-arquitetonico.pdf",
					},
					{
						name: "Especificação Técnica",
						description: "Especificações dos sistemas",
						model: "http://www.example.com/especificacao-sistemas.pdf",
					},
					{
						name: "Plano de Implementação",
						description: "Cronograma de implementação",
						model: "http://www.example.com/implementacao-centro.pdf",
					},
					{
						name: "Plano de Operações",
						description: "Procedimentos operacionais",
						model: "http://www.example.com/operacoes.pdf",
					},
					{
						name: "Plano de Capacitação",
						description: "Treinamento dos operadores",
						model: "http://www.example.com/capacitacao-centro.pdf",
					},
					{
						name: "Plano de Segurança",
						description: "Medidas de segurança do centro",
						model: "http://www.example.com/seguranca-centro.pdf",
					},
					{
						name: "Plano de Backup",
						description: "Sistema de backup e redundância",
						model: "http://www.example.com/backup-centro.pdf",
					},
					{
						name: "Plano de Integração",
						description: "Integração com sistemas existentes",
						model: "http://www.example.com/integracao-centro.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência operacional",
						model: "http://www.example.com/contingencia-centro.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade do centro",
						model: "http://www.example.com/sustentabilidade-centro.pdf",
					},
				],
			},
		},
		{
			title: "Capacitação em Inteligência Policial",
			slug: Slug.createFromText("Capacitação em Inteligência Policial").value,
			responsibleAgency: "Academia de Polícia",
			description:
				"Este programa visa capacitar agentes de segurança pública em técnicas avançadas de inteligência policial. A iniciativa busca modernizar as metodologias de análise criminal e melhorar a eficiência das investigações.\n\nO programa inclui treinamento em análise de dados, técnicas de investigação e uso de tecnologias avançadas. A meta é formar profissionais capazes de prevenir e combater crimes de forma mais eficiente.",
			typeId: typeId,
			availableValue: 400000,
			minValue: 300000,
			maxValue: 400000,
			initialDeadline: "2025-06-01T18:00:28.044Z",
			finalDeadline: "2025-07-01T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 40,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Programa de Treinamento",
						description: "Detalhamento do programa",
						model: "http://www.example.com/programa-treinamento.pdf",
					},
					{
						name: "Plano de Currículo",
						description: "Estrutura curricular",
						model: "http://www.example.com/curriculo.pdf",
					},
					{
						name: "Plano de Avaliação",
						description: "Sistema de avaliação",
						model: "http://www.example.com/avaliacao-treinamento.pdf",
					},
					{
						name: "Plano de Certificação",
						description: "Processo de certificação",
						model: "http://www.example.com/certificacao.pdf",
					},
					{
						name: "Plano de Infraestrutura",
						description: "Infraestrutura necessária",
						model: "http://www.example.com/infraestrutura.pdf",
					},
					{
						name: "Plano de Instrutores",
						description: "Seleção e capacitação de instrutores",
						model: "http://www.example.com/instrutores.pdf",
					},
					{
						name: "Plano de Materiais",
						description: "Materiais didáticos",
						model: "http://www.example.com/materiais.pdf",
					},
					{
						name: "Plano de Práticas",
						description: "Exercícios práticos",
						model: "http://www.example.com/praticas.pdf",
					},
					{
						name: "Plano de Acompanhamento",
						description: "Acompanhamento pós-treinamento",
						model: "http://www.example.com/acompanhamento.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade do programa",
						model: "http://www.example.com/sustentabilidade-treinamento.pdf",
					},
				],
			},
		},
		{
			title: "Sistema de Alerta Comunitário",
			slug: Slug.createFromText("Sistema de Alerta Comunitário").value,
			responsibleAgency: "Secretaria de Inovação e Tecnologia",
			description:
				"Este projeto visa criar um sistema de alerta comunitário através de um aplicativo móvel que permita a comunicação direta entre cidadãos e autoridades. A iniciativa busca aumentar a participação da comunidade na segurança pública.\n\nO sistema incluirá funcionalidades de denúncia anônima, alertas de emergência e informações sobre segurança. A meta é criar uma rede colaborativa que fortaleça a relação entre cidadãos e forças de segurança.",
			typeId: typeId,
			availableValue: 350000,
			minValue: 250000,
			maxValue: 350000,
			initialDeadline: "2025-05-25T18:00:28.044Z",
			finalDeadline: "2025-06-25T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 30,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Protótipo do Aplicativo",
						description: "Protótipo funcional",
						model: "http://www.example.com/prototipo-aplicativo.pdf",
					},
					{
						name: "Especificação Técnica",
						description: "Especificações do sistema",
						model: "http://www.example.com/especificacao-sistema.pdf",
					},
					{
						name: "Plano de Desenvolvimento",
						description: "Cronograma de desenvolvimento",
						model: "http://www.example.com/desenvolvimento.pdf",
					},
					{
						name: "Plano de Segurança",
						description: "Medidas de segurança",
						model: "http://www.example.com/seguranca-app.pdf",
					},
					{
						name: "Plano de Privacidade",
						description: "Políticas de privacidade",
						model: "http://www.example.com/privacidade-app.pdf",
					},
					{
						name: "Plano de Testes",
						description: "Plano de testes do sistema",
						model: "http://www.example.com/testes.pdf",
					},
					{
						name: "Plano de Lançamento",
						description: "Estratégia de lançamento",
						model: "http://www.example.com/lancamento.pdf",
					},
					{
						name: "Plano de Suporte",
						description: "Sistema de suporte ao usuário",
						model: "http://www.example.com/suporte.pdf",
					},
					{
						name: "Plano de Manutenção",
						description: "Manutenção do sistema",
						model: "http://www.example.com/manutencao-app.pdf",
					},
					{
						name: "Plano de Atualizações",
						description: "Política de atualizações",
						model: "http://www.example.com/atualizacoes.pdf",
					},
				],
			},
		},
		{
			title: "Programa de Ressocialização de Jovens Infratores",
			slug: Slug.createFromText(
				"Programa de Ressocialização de Jovens Infratores"
			).value,
			responsibleAgency: "Secretaria de Assistência Social",
			description:
				"Este programa visa promover a ressocialização de jovens infratores através de atividades profissionalizantes e acompanhamento psicossocial. A iniciativa busca reduzir a reincidência e promover a integração social.\n\nO programa inclui cursos profissionalizantes, acompanhamento psicológico e parcerias com empresas para inserção no mercado de trabalho. A meta é oferecer oportunidades de desenvolvimento pessoal e profissional para os jovens.",
			typeId: typeId,
			availableValue: 600000,
			minValue: 400000,
			maxValue: 600000,
			initialDeadline: "2025-06-20T18:00:28.044Z",
			finalDeadline: "2025-07-20T18:00:28.044Z",
			requiresCounterpart: true,
			counterpartPercentage: 65,
			isActive: true,
			releasedForAll: false,
			requiredDocuments: {
				create: [
					{
						name: "Plano de Ressocialização",
						description: "Metodologia do programa",
						model: "http://www.example.com/plano-ressocializacao.pdf",
					},
					{
						name: "Plano de Cursos",
						description: "Programa de cursos profissionalizantes",
						model: "http://www.example.com/cursos.pdf",
					},
					{
						name: "Plano de Acompanhamento",
						description: "Acompanhamento psicossocial",
						model: "http://www.example.com/acompanhamento-psicossocial.pdf",
					},
					{
						name: "Plano de Parcerias",
						description: "Parcerias com empresas",
						model: "http://www.example.com/parcerias-empresas.pdf",
					},
					{
						name: "Plano de Avaliação",
						description: "Sistema de avaliação",
						model: "http://www.example.com/avaliacao-programa.pdf",
					},
					{
						name: "Plano de Infraestrutura",
						description: "Infraestrutura necessária",
						model: "http://www.example.com/infraestrutura-programa.pdf",
					},
					{
						name: "Plano de Equipe",
						description: "Composição da equipe",
						model: "http://www.example.com/equipe.pdf",
					},
					{
						name: "Plano de Monitoramento",
						description: "Sistema de monitoramento",
						model: "http://www.example.com/monitoramento-programa.pdf",
					},
					{
						name: "Plano de Sustentabilidade",
						description: "Sustentabilidade do programa",
						model: "http://www.example.com/sustentabilidade-programa.pdf",
					},
					{
						name: "Plano de Contingência",
						description: "Plano de contingência",
						model: "http://www.example.com/contingencia-programa.pdf",
					},
				],
			},
		},
	];
};

export async function seedOpportunities(prisma: PrismaClient, typeId: string) {
	console.log("🌱 Seeding opportunities...");

	for (const opportunityData of opportunities(typeId)) {
		// 1. Cria a oportunidade
		const opportunity = await prisma.opportunity.create({
			data: opportunityData,
		});

		// 2. Cria um ProjectType com o mesmo nome da oportunidade
		const projectType = await prisma.projectType.create({
			data: {
				name: opportunityData.title,
				// Cria documentos com o mesmo nome dos documentos da oportunidade
				documents: {
					create: (opportunityData.requiredDocuments?.create || []).map(
						(doc: any) => ({
							name: doc.name,
						})
					),
				},
			},
		});

		// 3. Associa na tabela intermediária
		await prisma.opportunityProjectType.create({
			data: {
				opportunityId: opportunity.id,
				projectTypeId: projectType.id,
			},
		});
	}

	console.log("✅ Opportunities seeded successfully");
}

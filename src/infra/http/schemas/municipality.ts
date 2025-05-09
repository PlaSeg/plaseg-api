import { z } from "zod";

export const createMunicipalityRequestBodySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	guardInitialDate: z.coerce.date({
		required_error: "Data inicial da guarda é obrigatória",
		invalid_type_error: "Data inicial da guarda inválida",
	}),
	guardCount: z.number().int().min(0, "Contagem da guarda deve ser um número inteiro não negativo"),
	trafficInitialDate: z.coerce.date({
		required_error: "Data inicial do trânsito é obrigatória",
		invalid_type_error: "Data inicial do trânsito inválida",
	}),
	trafficCount: z.number().int().min(0, "Contagem do trânsito deve ser um número inteiro não negativo"),
	federativeUnit: z.string().length(2, "UF deve ter 2 caracteres"),
	unitType: z.enum(["UF", "MUNICIPALITY"], {
		errorMap: () => ({ message: "Tipo de unidade inválido" }),
	})
});
import { z } from "zod";

export const createBaseProductBodySchema = z.object({
	code: z.string().min(1, "Código é obrigatório"),
	name: z.string().min(1, "Nome é obrigatório"),
	technicalDescription: z.string().min(1, "Descrição técnica é obrigatória"),
	budget1: z.number({ invalid_type_error: "Orçamento 1 deve ser um número" }),
	budget1Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 1 inválida",
	}),
	budget2: z.number({ invalid_type_error: "Orçamento 2 deve ser um número" }),
	budget2Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 2 inválida",
	}),
	budget3: z.number({ invalid_type_error: "Orçamento 3 deve ser um número" }),
	budget3Validity: z.coerce.date({
		invalid_type_error: "Data de validade do orçamento 3 inválida",
	}),
	unitValue: z.number({
		invalid_type_error: "Valor unitário deve ser um número",
	}),
	typeId: z.string().uuid("ID do tipo inválido"),
});

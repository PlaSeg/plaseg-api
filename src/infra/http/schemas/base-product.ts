import { z } from "zod";

export const createBaseProductBodySchema = z.object({
	code: z.string().min(1, "Código é obrigatório"),
	name: z.string().min(1, "Nome é obrigatório"),
	technicalDescription: z.string().min(1, "Descrição técnica é obrigatória"),
	budget1: z.number().min(0, "Orçamento 1 deve ser maior ou igual a 0"),
	budget1Validity: z.coerce.date(),
	budget2: z.number().min(0, "Orçamento 2 deve ser maior ou igual a 0"),
	budget2Validity: z.coerce.date(),
	budget3: z.number().min(0, "Orçamento 3 deve ser maior ou igual a 0"),
	budget3Validity: z.coerce.date(),
	unitValue: z.number().min(0, "Valor unitário deve ser maior ou igual a 0"),
	typeId: z.string().uuid("ID do tipo deve ser um UUID válido"),
});

export const baseProductResponseSchema = z.object({
	id: z.string().uuid(),
	code: z.string(),
	name: z.string(),
	technicalDescription: z.string(),
	budget1: z.number(),
	budget1Validity: z.coerce.date(),
	budget2: z.number(),
	budget2Validity: z.coerce.date(),
	budget3: z.number(),
	budget3Validity: z.coerce.date(),
	unitValue: z.number(),
	typeId: z.string().uuid(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
});

export const getBaseProductsResponseSchema = z.object({
	baseProducts: z.array(baseProductResponseSchema).nullable(),
});

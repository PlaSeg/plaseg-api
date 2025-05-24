import { z } from "zod";

export const fieldBodySchema = z.object({
	id: z.string(),
	name: z.string(),
	value: z.string().optional(),
	parentId: z.string().optional(),
});

export const createProjectTypeBodySchema = z.object({
	name: z.string().min(1, "O nome do tipo de projeto é obrigatório."),
	fields: z.array(fieldBodySchema).min(1, "Os campos são obrigatórios."),
});

export const getProjectTypesBodySchema = z
	.array(createProjectTypeBodySchema)
	.nullable();

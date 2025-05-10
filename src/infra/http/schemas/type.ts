import { z } from "zod";

export const createTypeBodySchema = z.object({
	description: z.string().min(3, "A descrição deve ter no mínimo 3 caracteres"),
	group: z.enum(
		["SERVICE", "CATEGORY", "SUBCATEGORY", "SUBSUBCATEGORY", "OPPORTUNITY"],
		{
			errorMap: () => ({ message: "Grupo inválido" }),
		}
	),
	parentId: z.string().uuid("parentId deve ser um UUID válido").optional(),
});

export const getTypesByGroupParentIdQuerySchema = z.object({
	group: z.string().min(1, "Group is required"),
	parentId: z.string().uuid("Invalid UUID").optional(),
});

export const TypeResponseSchema = z.object({
	id: z.string().uuid(),
	description: z.string(),
	group: z.enum([
		"SERVICE",
		"CATEGORY",
		"SUBCATEGORY",
		"SUBSUBCATEGORY",
		"OPPORTUNITY",
	]),
	parentId: z.string().uuid().optional(),
	createdAt: z.date(),
	updatedAt: z.date().nullable().optional(),
});

export const getTypesResponseSchema = z.array(TypeResponseSchema).nullable();

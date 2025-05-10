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

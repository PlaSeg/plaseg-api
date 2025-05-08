import { z } from "zod";

export const createAllocationDepartmentBodySchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	address: z.string().min(1, "Endereço é obrigatório"),
});

import { z } from "zod";

export const createMaintenanceContractRequestBodySchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	attachment: z.string().min(1, "Anexo é obrigatório")
});

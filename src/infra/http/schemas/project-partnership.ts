import { z } from "zod";

export const createProjectPartnershipBodySchema = z.object({
	term: z.string().min(1, "Termo é obrigatório"),
	agency: z.string().min(1, "Órgão/Agência é obrigatório"),
	objective: z.string().min(1, "Objetivo é obrigatório"),
	status: z.string().min(1, "Status é obrigatório"),
});

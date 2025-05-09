import { z } from "zod";

export const createQualifiedStaffBodySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	sector: z.string().min(1, "Setor é obrigatório"),
	education: z.string().min(1, "Formação é obrigatória"),
	experience: z.string().min(1, "Experiência é obrigatória"),
	employmentType: z.enum(["CLT", "PJ", "OTHERS"], {
		errorMap: () => ({ message: "Tipo de vínculo inválido" }),
	}),
	document: z.string().refine(
		(val) => {
			const length = val.length;
			return length === 11 || length === 14;
		},
		{ message: "Documento Inválido" }
	),
	isResponsible: z.boolean({
		required_error: "Indicação de responsável é obrigatória",
	}),
});
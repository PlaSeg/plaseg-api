import { z } from "zod";

export const createCompanyRequestBodySchema = z.object({
	cnpj: z
		.string()
		.min(14, "O CNPJ deve ter no mínimo 14 caracteres")
		.max(18, "O CNPJ deve ter no máximo 18 caracteres"),
	legalName: z
		.string()
		.min(3, "A razão social deve ter no mínimo 3 caracteres"),
	tradeName: z
		.string()
		.min(3, "O nome fantasia deve ter no mínimo 3 caracteres"),
	address: z.string().min(5, "O endereço deve ter no mínimo 5 caracteres"),
	email: z.string().email("E-mail inválido"),
	phone: z.string().min(10, "O telefone deve ter no mínimo 10 caracteres"),
	site: z
		.string()
		.url("URL do site inválida"),
	portfolioDescription: z
		.string()
		.min(10, "A descrição do portfólio deve ter no mínimo 10 caracteres"),
});

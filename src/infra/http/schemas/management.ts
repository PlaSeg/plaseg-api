import { z } from "zod";

export const createManagementBodySchema = z.object({
	initialDate: z.coerce.date({
		required_error: "Data inicial é obrigatória",
		invalid_type_error: "Data inicial inválida",
	}),
	endDate: z.coerce.date({
		required_error: "Data final é obrigatória",
		invalid_type_error: "Data final inválida",
	}),
	managerName: z.string().min(1, "Nome do gerente é obrigatório"),
	managerCpf: z
		.string()
		.refine((val) => val.length === 11, { message: "CPF do gerente inválido" }),
	managerEmail: z.string().email("Email do gerente inválido"),
	managerAddress: z.string().min(1, "Endereço do gerente é obrigatório"),
	managerPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone do gerente inválido",
		}),
	adminManagerName: z
		.string()
		.min(1, "Nome do gerente administrativo é obrigatório"),
	adminManagerCpf: z
		.string()
		.refine((val) => val.length === 11, {
			message: "CPF do gerente administrativo inválido",
		}),
	adminManagerEmail: z
		.string()
		.email("Email do gerente administrativo inválido"),
	adminManagerAddress: z
		.string()
		.min(1, "Endereço do gerente administrativo é obrigatório"),
	adminManagerPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone do gerente administrativo inválido",
		}),
	legislationName: z.string().min(1, "Nome da legislação é obrigatório"),
	legislationCpf: z
		.string()
		.refine((val) => val.length === 11, {
			message: "CPF da legislação inválido",
		}),
	legislationEmail: z.string().email("Email da legislação inválido"),
	legislationAddress: z.string().min(1, "Endereço da legislação é obrigatório"),
	legislationPhone: z
		.string()
		.refine((val) => val.length === 10 || val.length === 11, {
			message: "Telefone da legislação inválido",
		})
});

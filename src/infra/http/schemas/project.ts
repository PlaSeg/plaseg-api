import { z } from "zod";

export const createProjectPartiallyRequestBodySchema = z.object({
	title: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	opportunityId: z.string().uuid(),
	projectTypeId: z.string().uuid(),
});

export const patchProjectGeneralInfoParamsSchema = z.object({
	projectId: z.string().uuid(),
});

export const patchProjectGeneralInfoBodySchema = z.object({
	responsibleCpf: z.string().optional(),
	responsibleName: z.string().optional(),
	responsibleEmail: z.string().email().optional(),
	responsiblePhone: z.string().optional(),
	counterpartCapitalItem: z.string().optional(),
	counterpartCapitalValue: z.number().positive().optional(),
	counterpartOperatingCostCode: z.string().optional(),
	counterpartOperatingCostValue: z.number().positive().optional(),
	totalValue: z.number().positive().optional(),
	requestedValue: z.number().positive().optional(),
	baseValue: z.number().positive().optional(),
});

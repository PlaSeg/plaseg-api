import { z } from "zod";

export const maintenanceContractResponseSchema = z.object({
	id: z.string().uuid(),
	description: z.string(),
	attachment: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
});

export const getMaintenanceContractsResponseSchema = z
	.array(maintenanceContractResponseSchema)
	.nullable();

export type MaintenanceContractResponse = z.infer<
	typeof maintenanceContractResponseSchema
>;
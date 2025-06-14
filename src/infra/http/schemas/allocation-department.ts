import { z } from "zod";

export const allocationDepartmentResponseSchema = z.object({
	id: z.string().uuid(),
	description: z.string(),
	address: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable().optional(),
});

export const getAllocationDepartmentsResponseSchema = z
	.array(allocationDepartmentResponseSchema)
	.nullable();

export type AllocationDepartmentResponse = z.infer<typeof allocationDepartmentResponseSchema>;
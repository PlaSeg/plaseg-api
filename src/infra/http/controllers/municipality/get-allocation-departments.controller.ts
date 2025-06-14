import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetAllocationDepartmentsUseCase } from "../../../database/prisma/use-cases/make-get-allocation-departments-use-case";
import { getAllocationDepartmentsResponseSchema } from "../../schemas/allocation-department";
import { AllocationDepartmentPresenter } from "../../presenters/allocation-department-presenter";

export async function getAllocationDepartments(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/municipality/allocation-departments",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN", "MUNICIPALITY"])],
			schema: {
				tags: ["Municipality"],
				operationId: "getAllocationDepartments",
				security: [{ bearerAuth: [] }],
				summary: "Get all allocation departments",
				response: {
					200: successResponseSchema(
						getAllocationDepartmentsResponseSchema
					).describe("Success"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.sub;

			const getAllocationDepartmentsUseCase =
				makeGetAllocationDepartmentsUseCase();

			const result = await getAllocationDepartmentsUseCase.execute({ userId });

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: result.value.allocationDepartments.map(AllocationDepartmentPresenter.toHTTP),
			});
		}
	);
}

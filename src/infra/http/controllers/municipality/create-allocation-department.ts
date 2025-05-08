import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createAllocationDepartmentBodySchema } from "../../schemas/allocation-department";
import { makeCreateAllocationDepartmentUseCase } from "../../../database/prisma/use-cases/make-create-allocation-department-use-case";

export async function createAllocationDepartment(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality/allocation-department",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createAllocationDepartment",
				security: [{ bearerAuth: [] }],
				summary: "Create a new allocation department",
				body: createAllocationDepartmentBodySchema.describe(
					"Create allocation department request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createAllocationDepartmentBodySchema.parse(request.body);

			const createAllocationDepartmentUseCase =
				makeCreateAllocationDepartmentUseCase();

			const response = await createAllocationDepartmentUseCase.execute({
				...body,
				userId: request.user.sub,
			});

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
					data: null,
				});
			}

			return reply.status(201).send({
				success: true,
				errors: null,
				data: null,
			});
		}
	);
}

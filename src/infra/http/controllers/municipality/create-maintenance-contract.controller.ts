import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createMaintenanceContractRequestBodySchema } from "../../schemas/maintenance-contract";
import { makeCreateMaintenanceContractUseCase } from "../../../database/prisma/use-cases/make-create-maintenance-contract";

export async function createMaintenanceContract(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality/maintenance-contract",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createMaintenanceContract",
				security: [{ bearerAuth: [] }],
				summary: "Create a new maintenance-contract",
				body: createMaintenanceContractRequestBodySchema.describe(
					"Create maintenance contract request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createMaintenanceContractRequestBodySchema.parse(request.body);

			const createAllocationDepartmentUseCase = makeCreateMaintenanceContractUseCase();

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

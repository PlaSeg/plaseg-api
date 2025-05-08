import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { createManagementBodySchema } from "../../schemas/management";
import { makeCreateManagementUseCase } from "../../../database/prisma/use-cases/make-create-management-use-case";

export async function createManagement(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality/management",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createManagement",
				security: [{ bearerAuth: [] }],
				summary: "Create a new management",
				body: createManagementBodySchema.describe(
					"Create management request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createManagementBodySchema.parse(request.body);

			const createManagementUseCase = makeCreateManagementUseCase();

			const response = await createManagementUseCase.execute({
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

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { createProjectPartnershipBodySchema } from "../../schemas/project-partnership";
import { makeCreateProjectPartnershipUseCase } from "../../../database/prisma/use-cases/make-create-project-partnership-use-case";

export async function createProjectPartnership(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality/project-partnership",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createProjectPartnership",
				security: [{ bearerAuth: [] }],
				summary: "Create a new project partnership",
				body: createProjectPartnershipBodySchema.describe(
					"Create project partnership request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createProjectPartnershipBodySchema.parse(request.body);

			const createProjectPartnershipUseCase =
				makeCreateProjectPartnershipUseCase();

            const response = await createProjectPartnershipUseCase.execute({
                ...body,
                userId: request.user.sub
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

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeUpdateOpportunityUseCase } from "../../../database/prisma/use-cases/make-update-opportunity-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { updateOpportunityRequestBodySchema } from "../../schemas/opportunity";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";

export async function updateOpportunity(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/opportunities/:id",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Opportunities"],
				operationId: "updateOpportunity",
				summary: "Update an existing opportunity",
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.string().uuid(),
				}),
				body: updateOpportunityRequestBodySchema.describe(
					"Update opportunity request body"
				),
				response: {
					200: successResponseSchema(z.null()).describe("Updated"),
					400: errorResponseSchema.describe("Bad Request"),
					404: errorResponseSchema.describe("Not Found"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const body = updateOpportunityRequestBodySchema.parse(request.body);

			const updateOpportunityUseCase = makeUpdateOpportunityUseCase();

			const result = await updateOpportunityUseCase.execute({
				id,
				...body,
			});

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: null,
			});
		}
	);
}

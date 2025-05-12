import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { opportunityResponseSchema } from "../../schemas/opportunity";
import { verifyJwt } from "../../middleware/auth";
import { makeGetOpportunityByIdUseCase } from "../../../database/prisma/use-cases/make-get-opportunity-by-id-use-case";
import { z } from "zod";

export async function getOpportunityById(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/opportunities/:id",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Opportunities"],
				operationId: "getOpportunityById",
				summary: "Get opportunity by id",
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					200: successResponseSchema(opportunityResponseSchema).describe(
						"Success"
					),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const getOpportunityByIdUseCase = makeGetOpportunityByIdUseCase();

			const result = await getOpportunityByIdUseCase.execute({
				opportunityId: id,
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
				data: result.value.opportunity,
			});
		}
	);
}

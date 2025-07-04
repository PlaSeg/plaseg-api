import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { getOpportunitiesResponseSchema } from "../../schemas/opportunity";
import { verifyJwt } from "../../middleware/auth";
import { makeGetOpportunitiesUseCase } from "../../../database/prisma/use-cases/make-get-opportunities-use-case";

export async function getOpportunities(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/opportunities",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Opportunities"],
				operationId: "getOpportunities",
				summary: "Get opportunities",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getOpportunitiesResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (_, reply) => {
			const getOpportunitiesUseCase = makeGetOpportunitiesUseCase();

			const result = await getOpportunitiesUseCase.execute();

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
				data: result.value.opportunities,
			});
		}
	);
}

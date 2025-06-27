import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { baseProductWithMoreInfoResponseSchema } from "../../schemas/base-product";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import { makeGetBaseProductsByOpportunityIdUseCase } from "../../../database/prisma/use-cases/make-get-base-products-by-opportunity-id-use-case";
import { BaseProductWithMoreInfoPresenter } from "../../presenters/base-product-by-opportunity-id-presenter";

export async function getBaseProductsByOpportunityId(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/base-products/opportunity/:opportunityId",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"])],
			schema: {
				tags: ["Base Products"],
				operationId: "getBaseProductsByOpportunityId",
				summary: "Get base products by opportunity id",
				security: [{ bearerAuth: [] }],
				params: z.object({
					opportunityId: z.string().uuid("ID deve ser um UUID válido"),
				}),
				response: {
					200: successResponseSchema(
						z.object({
							baseProducts: z.array(baseProductWithMoreInfoResponseSchema),
						})
					).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { opportunityId } = request.params;

			const getBaseProductsByOpportunityIdUseCase =
				makeGetBaseProductsByOpportunityIdUseCase();

			const result = await getBaseProductsByOpportunityIdUseCase.execute(
				opportunityId
			);

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
				data: {
					baseProducts: result.value.baseProducts.map(BaseProductWithMoreInfoPresenter.toHTTP),
				},
			});
		}
	);
}

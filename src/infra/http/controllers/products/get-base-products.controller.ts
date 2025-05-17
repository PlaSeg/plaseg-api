import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { getBaseProductsResponseSchema } from "../../schemas/base-product";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetBaseProductUseCase } from "../../../database/prisma/use-cases/make-get-base-product-use-case";

export async function getBaseProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/base-products",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Base Products"],
				operationId: "getBaseProducts",
				summary: "Get base products",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getBaseProductsResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (_, reply) => {
			const getBaseProductUseCase = makeGetBaseProductUseCase();

			const result = await getBaseProductUseCase.execute();

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
					baseProducts: result.value.baseProducts,
				},
			});
		}
	);
}

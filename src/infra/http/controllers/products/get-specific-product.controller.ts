import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { getSpecificProductBodySchema } from "../../schemas/specific-product";
import { makeGetSpecificProductUseCase } from "../../../database/prisma/use-cases/make-get-specific-product-use-case";

export async function getSpecificProducts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/specific-products",
		{
			onRequest: [verifyUserRole(["COMPANY"])],
			schema: {
				tags: ["Specific Products"],
				operationId: "getSpecificProducts",
				summary: "Get specific products",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(getSpecificProductBodySchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.sub;

			const getSpecificProductUseCase = makeGetSpecificProductUseCase();

			const result = await getSpecificProductUseCase.execute({
				userId
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
				data: {
					specificProducts: result.value.specificProducts,
				},
			});
		}
	);
}

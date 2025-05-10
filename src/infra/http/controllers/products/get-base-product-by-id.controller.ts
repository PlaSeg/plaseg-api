import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { baseProductResponseSchema } from "../../schemas/base-product";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetBaseProductByIdUseCase } from "../../../database/prisma/use-cases/make-get-base-product-by-id-use-case";
import { z } from "zod";

export async function getBaseProductById(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/products/base-product/:id",
		{
			onRequest: [verifyUserRole("ADMIN")],
			schema: {
				tags: ["Products"],
				operationId: "getBaseProductById",
				summary: "Get base product by id",
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.string().uuid("ID deve ser um UUID válido"),
				}),
				response: {
					200: successResponseSchema(
						z.object({
							baseProduct: baseProductResponseSchema.nullable(),
						})
					).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const getBaseProductByIdUseCase = makeGetBaseProductByIdUseCase();

			const result = await getBaseProductByIdUseCase.execute({ id });

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
					baseProduct: result.value.baseProduct,
				},
			});
		}
	);
}

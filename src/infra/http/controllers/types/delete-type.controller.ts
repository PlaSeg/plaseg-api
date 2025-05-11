import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeDeleteTypeUseCase } from "../../../database/prisma/use-cases/make-delete-type-use-case";
import { z } from "zod";

export async function deleteType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		"/types/:id",
		{
			onRequest: [verifyUserRole("ADMIN")],
			schema: {
				tags: ["Types"],
				operationId: "deleteType",
				summary: "Delete a type",
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.string().uuid("Id inválido"),
				}),
				response: {
					200: successResponseSchema(z.null()).describe("Deleted"),
					400: errorResponseSchema.describe("Bad Request"),
					404: errorResponseSchema.describe("Not Found"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const deleteTypeUseCase = makeDeleteTypeUseCase();

			const result = await deleteTypeUseCase.execute({ id });

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

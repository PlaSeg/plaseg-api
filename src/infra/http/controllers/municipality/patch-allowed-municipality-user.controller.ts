import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makePatchMunicipalityUserUseCase } from "../../../database/prisma/use-cases/make-patch-municipality-user-use-case";
import { z } from "zod";

const patchMunicipalityUserParamsSchema = z.object({
	userId: z.string().uuid(),
});

export async function patchAllowedMunicipalityUser(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/municipality/users/:userId",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN"])],
			schema: {
				tags: ["Municipality"],
				operationId: "patchAllowedMunicipalityUser",
				security: [{ bearerAuth: [] }],
				summary: "Toggle municipality user allowed status",
				params: patchMunicipalityUserParamsSchema,
				response: {
					200: successResponseSchema(z.null()).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
					404: errorResponseSchema.describe("Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { userId } = patchMunicipalityUserParamsSchema.parse(
				request.params
			);

			const patchMunicipalityUserUseCase = makePatchMunicipalityUserUseCase();

			const result = await patchMunicipalityUserUseCase.execute({
				userId,
			});

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: [result.value.message],
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

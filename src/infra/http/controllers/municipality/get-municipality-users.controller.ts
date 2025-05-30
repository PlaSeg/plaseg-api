import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetMunicipalityUsersUseCase } from "../../../database/prisma/use-cases/make-get-municipality-use-case";
import { UserPresenter } from "../../presenters/user-presenter";
import { getMunicipalityUsersResponseSchema } from "../../schemas/municipality";

export async function getMunicipalityUsers(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/municipality/users",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN"])],
			schema: {
				tags: ["Municipality"],
				operationId: "getMunicipalityUsers",
				security: [{ bearerAuth: [] }],
				summary: "Get all municipality users",
				response: {
					200: successResponseSchema(
						getMunicipalityUsersResponseSchema
					).describe("Success"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (_, reply) => {
			const getMunicipalityUsersUseCase = makeGetMunicipalityUsersUseCase();

			const result = await getMunicipalityUsersUseCase.execute();

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: ["Erro ao buscar usuários municipais"],
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: result.value.users.map(UserPresenter.toHTTP),
			});
		}
	);
}

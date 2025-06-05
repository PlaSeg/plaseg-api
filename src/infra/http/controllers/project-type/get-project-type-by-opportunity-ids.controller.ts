import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { getProjectTypesResponseSchema } from "../../schemas/project-type";

import { ProjectTypePresenter } from "../../presenters/project-type-presenter";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import { makeGetProjectTypesByOpportunityIdUseCase } from "../../../database/prisma/use-cases/make-get-project-types-by-opportunity-id-use-case";

export async function getProjectTypesByOpportunityId(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/project-types/:opportunityId",
		{
			onRequest: [
				verifyJwt,
				verifyUserRole(["ADMIN", "ADMIN_MASTER", "MUNICIPALITY"]),
			],
			schema: {
				tags: ["Project Types"],
				operationId: "getProjectTypesByOpportunityId",
				summary: "Get project types by opportunity ID",
				security: [{ bearerAuth: [] }],
				params: z.object({
					opportunityId: z.string().uuid("ID da oportunidade inválido"),
				}),
				response: {
					200: successResponseSchema(getProjectTypesResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { opportunityId } = request.params;

			const getProjectTypesByOpportunityIdUseCase =
				makeGetProjectTypesByOpportunityIdUseCase();

			const result = await getProjectTypesByOpportunityIdUseCase.execute(
				opportunityId
			);

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: ["Erro ao buscar os tipos de projeto da oportunidade"],
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: result.value.projectTypes.map(ProjectTypePresenter.toHTTP),
			});
		}
	);
}

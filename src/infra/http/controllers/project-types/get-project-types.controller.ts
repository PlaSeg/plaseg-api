import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { z } from "zod";
import { ProjectTypePresenter } from "../../presenters/project-type-presenter";
import { projectTypeResponseSchema } from "../../schemas/project-type";
import { makeGetProjectTypesUseCase } from "../../../database/prisma/use-cases/make-get-project-types-use-case";

export async function getProjectTypes(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/project-types",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Project Types"],
				operationId: "getProjectTypes",
				summary: "Get project types",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(
						z.array(projectTypeResponseSchema)
					).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (_, reply) => {
			const getProjectTypesUseCase = makeGetProjectTypesUseCase();

			const result = await getProjectTypesUseCase.execute();

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: ["Erro ao buscar os tipos de projeto"],
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

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { z } from "zod";
import { makeGetProjectTypeByIdUseCase } from "../../../database/prisma/use-cases/make-get-project-type-by-id-use-case";
import { ProjectTypePresenter } from "../../presenters/project-type-presenter";
import { projectTypeResponseSchema } from "../../schemas/project-type";

export async function getProjectTypeByName(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/project-types/:id",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Project Types"],
				operationId: "getProjectTypeByName",
				summary: "Get project type by name",
				security: [{ bearerAuth: [] }],
				params: z.object({
					id: z.string().uuid("ID deve ser um UUID válido"),
				}),
				response: {
					200: successResponseSchema(projectTypeResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const getProjectTypeUseCase = makeGetProjectTypeByIdUseCase();

			const result = await getProjectTypeUseCase.execute({ id });

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
				data: ProjectTypePresenter.toHTTP(result.value.projectType),
			});
		}
	);
}

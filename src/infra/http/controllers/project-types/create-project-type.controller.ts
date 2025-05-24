import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { z } from "zod";
import { makeCreateProjectTypeUseCase } from "../../../database/prisma/use-cases/make-create-project-type-use-case";
import { createProjectTypeBodySchema } from "../../schemas/project-type";

export async function createProjectType(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/project-types",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER"])],
			schema: {
				tags: ["Project Types"],
				operationId: "createProjectType",
				summary: "Create a new project type",
				security: [{ bearerAuth: [] }],
				body: createProjectTypeBodySchema.describe(
					"Create project type request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createProjectTypeBodySchema.parse(request.body);

			const createTypeUseCase = makeCreateProjectTypeUseCase();

			const result = await createTypeUseCase.execute(body);

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			return reply.status(201).send({
				success: true,
				errors: null,
				data: null,
			});
		}
	);
}

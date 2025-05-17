import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createCompanyRequestBodySchema } from "../../schemas/company";
import { makeCreateCompanyUseCase } from "../../../database/prisma/use-cases/make-create-company-use-case";

export async function createCompany(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/company",
		{
			onRequest: [verifyUserRole(["COMPANY"])],
			schema: {
				tags: ["Company"],
				operationId: "createCompany",
				security: [{ bearerAuth: [] }],
				summary: "Create a new company",
				body: createCompanyRequestBodySchema.describe(
					"Create company request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createCompanyRequestBodySchema.parse(request.body);

			const createCompanyUseCase = makeCreateCompanyUseCase();

			const response = await createCompanyUseCase.execute({
				...body,
				userId: request.user.sub,
			});

			if (response.isLeft()) {
				return reply.status(response.value.statusCode).send({
					success: false,
					errors: response.value.errors,
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

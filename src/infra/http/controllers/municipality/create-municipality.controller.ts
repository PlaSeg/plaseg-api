import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { createMunicipalityRequestBodySchema } from "../../schemas/municipality";
import { makeCreateMunicipalityUseCase } from "../../../database/prisma/use-cases/make-create-municipality-use-case";
import { verifyUserRole } from "../../middleware/verify-user-role";

export async function createMunicipality(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality",
		{
            onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createMunicipality",
                security: [{ bearerAuth: [] }],
				summary: "Create a new municipality",
				body: createMunicipalityRequestBodySchema.describe("Create municipality request body"),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createMunicipalityRequestBodySchema.parse(request.body);

			const createMunicipalityUseCase = makeCreateMunicipalityUseCase();

			const response = await createMunicipalityUseCase.execute({
                ...body,
                userId: request.user.sub
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

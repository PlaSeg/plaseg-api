import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { makeCreateOpportunityUseCase } from "../../../database/prisma/use-cases/make-create-opportunity-use-case";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import {
	createOpportunityRequestBodySchema,
	opportunityResponseSchema,
} from "../../schemas/opportunity";

export async function createOpportunity(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/opportunities",
		{
			schema: {
				tags: ["Opportunities"],
				operationId: "createOpportunity",
				summary: "Create a new opportunity",
				body: createOpportunityRequestBodySchema.describe(
					"Create opportunity request body"
				),
				response: {
					201: successResponseSchema(opportunityResponseSchema).describe(
						"Created"
					),
					400: errorResponseSchema.describe("Bad Request"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const body = createOpportunityRequestBodySchema.parse(request.body);

			const createOpportunityUseCase = makeCreateOpportunityUseCase();

			const result = await createOpportunityUseCase.execute(body);

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
				data: result.value.opportunity,
			});
		}
	);
}

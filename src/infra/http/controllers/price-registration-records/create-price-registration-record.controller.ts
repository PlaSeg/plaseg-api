import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { createPriceRegistrationRecordBodySchema } from "../../schemas/price-registration-record";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeCreatePriceRegistrationRecordUseCase } from "../../../database/prisma/use-cases/make-create-price-registration-record";
import { z } from "zod";

export async function createPriceRegistrationRecord(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/price-registration-records",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER", "COMPANY"])],
			schema: {
				tags: ["Price Registration Records"],
				operationId: "createPriceRegistrationRecord",
				summary: "Create a new price registration record",
				security: [{ bearerAuth: [] }],
				body: createPriceRegistrationRecordBodySchema.describe(
					"Create price registration record request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
					401: errorResponseSchema.describe("Unauthorized"),
					409: errorResponseSchema.describe("Conflict"),
				},
			},
		},
		async (request, reply) => {
			const { ...body } = createPriceRegistrationRecordBodySchema.parse(
				request.body
			);

			const createPriceRegistrationRecordUseCase =
				makeCreatePriceRegistrationRecordUseCase();

			const result = await createPriceRegistrationRecordUseCase.execute({
				...body,
				companyId: request.user.sub,
			});

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

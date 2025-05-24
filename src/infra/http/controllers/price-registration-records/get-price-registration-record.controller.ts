import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { getPriceRegistrationRecordsResponseSchema } from "../../schemas/price-registration-record";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { makeGetPriceRegistrationRecordUseCase } from "../../../database/prisma/use-cases/make-get-price-registration-record-use-case";

export async function getPriceRegistrationRecords(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/price-registration-records",
		{
			onRequest: [verifyUserRole(["ADMIN", "ADMIN_MASTER", "COMPANY"])],
			schema: {
				tags: ["Price Registration Records"],
				operationId: "getPriceRegistrationRecords",
				summary: "Get price registration records",
				security: [{ bearerAuth: [] }],
				response: {
					200: successResponseSchema(
						getPriceRegistrationRecordsResponseSchema
					).describe("Success"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (_, reply) => {
			const getPriceRegistrationRecordUseCase =
				makeGetPriceRegistrationRecordUseCase();

			const result = await getPriceRegistrationRecordUseCase.execute();

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
				data: {
					priceRegistrationRecords: result.value.priceRegistrationRecords,
				},
			});
		}
	);
}

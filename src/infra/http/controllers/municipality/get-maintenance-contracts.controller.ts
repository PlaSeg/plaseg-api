import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { getMaintenanceContractsResponseSchema } from "../../schemas/maintenance-contracts";
import { makeGetMaintenanceContractsUseCase } from "../../../database/prisma/use-cases/make-get-maintenance-contracts-use-case";
import { MaintenanceContractPresenter } from "../../presenters/maintenance-contract-presenter";

export async function getMaintenanceContracts(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/municipality/maintenance-contracts",
		{
			onRequest: [verifyUserRole(["ADMIN_MASTER", "ADMIN", "MUNICIPALITY"])],
			schema: {
				tags: ["Municipality"],
				operationId: "getMaintenanceContracts",
				security: [{ bearerAuth: [] }],
				summary: "Get all maintenance contracts of a user",
				response: {
					200: successResponseSchema(
						getMaintenanceContractsResponseSchema
					).describe("Success"),
					401: errorResponseSchema.describe("Unauthorized"),
				},
			},
		},
		async (request, reply) => {
			const userId = request.user.sub;

			const getMaintenanceContractsUseCase =
				makeGetMaintenanceContractsUseCase();

			const result = await getMaintenanceContractsUseCase.execute({ userId });

			if (result.isLeft()) {
				return reply.status(500).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			return reply.status(200).send({
				success: true,
				errors: null,
				data: result.value.maintenanceContracts.map(
					MaintenanceContractPresenter.toHTTP
				),
			});
		}
	);
}

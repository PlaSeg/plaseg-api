import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { z } from "zod";
import { verifyJwt } from "../../middleware/auth";
import { verifyUserRole } from "../../middleware/verify-user-role";
import { createQualifiedStaffBodySchema } from "../../schemas/qualified-staff";
import { makeCreateQualifiedStaffUseCase } from "../../../database/prisma/use-cases/make-create-qualified-staff";

export async function createQualifiedStaff(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/municipality/qualified-staff",
		{
			onRequest: [verifyJwt, verifyUserRole("MEMBER")],
			schema: {
				tags: ["Municipality"],
				operationId: "createQualifiedStaff",
				security: [{ bearerAuth: [] }],
				summary: "Create a new qualified staff",
				body: createQualifiedStaffBodySchema.describe(
					"Create qualified staff request body"
				),
				response: {
					201: successResponseSchema(z.null()).describe("Created"),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const body = createQualifiedStaffBodySchema.parse(request.body);

			const createQualifiedStaffUseCase = makeCreateQualifiedStaffUseCase();

			const response = await createQualifiedStaffUseCase.execute({
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

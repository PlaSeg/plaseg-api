import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { errorResponseSchema, successResponseSchema } from "../../schemas/http";
import { verifyJwt } from "../../middleware/auth";
import { makeGetTypeByGroupParentIdUseCase } from "../../../database/prisma/use-cases/make-get-type-by-group-parend-id-use-case";
import {
	getTypesByGroupParentIdQuerySchema,
	getTypesResponseSchema,
} from "../../schemas/type";

export async function getTypesByGroupParentId(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/types/group-parent-id",
		{
			onRequest: [verifyJwt],
			schema: {
				tags: ["Types"],
				operationId: "getTypesByGroupParentId",
				summary:
					"Get types by group and parenId (The parent id is optional in the case of the group is a CATEGORY)",
				security: [{ bearerAuth: [] }],
				querystring: getTypesByGroupParentIdQuerySchema,
				response: {
					200: successResponseSchema(getTypesResponseSchema).describe(
						"Success"
					),
					400: errorResponseSchema.describe("Bad Request"),
				},
			},
		},
		async (request, reply) => {
			const { group, parentId } = request.query;

			const getTypeByGroupParentIdUseCase = makeGetTypeByGroupParentIdUseCase();

			const result = await getTypeByGroupParentIdUseCase.execute({
				group,
				parentId,
			});

			if (result.isLeft()) {
				return reply.status(result.value.statusCode).send({
					success: false,
					errors: result.value.errors,
					data: null,
				});
			}

			const types =
				result.value.types?.map((type) => ({
					...type,
					group: type.group as
						| "SERVICE"
						| "CATEGORY"
						| "SUBCATEGORY"
						| "SUBSUBCATEGORY"
						| "OPPORTUNITY",
				})) ?? null;

			return reply.status(200).send({
				success: true,
				errors: null,
				data: types,
			});
		}
	);
}

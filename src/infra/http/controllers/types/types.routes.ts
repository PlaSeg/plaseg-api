import type { FastifyInstance } from "fastify";
import { createType } from "./create-type.controller";
import { getTypesByGroupParentId } from "./get-type-by-group-parent-id.controller";

export async function typesRoutes(app: FastifyInstance) {
	app.register(createType);
	app.register(getTypesByGroupParentId);
}

import { FastifyInstance } from "fastify";
import { getTypes } from "./get-types.controller";
import { createType } from "./create-type.controller";

export async function typesRoutes(app: FastifyInstance) {
	app.register(createType);
	app.register(getTypes);
}

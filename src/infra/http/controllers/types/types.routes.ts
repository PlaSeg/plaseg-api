import type { FastifyInstance } from "fastify";
import { createType } from "./create-type.controller";

export async function typesRoutes(app: FastifyInstance) {
	app.register(createType);
}

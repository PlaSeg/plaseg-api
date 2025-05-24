import { FastifyInstance } from "fastify";
import { createProjectType } from "./create-project-type.controller";

export async function projectTypeRoutes(app: FastifyInstance) {
	app.register(createProjectType);
}

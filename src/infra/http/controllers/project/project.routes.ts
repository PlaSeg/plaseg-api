import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";

export async function projectsRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
}

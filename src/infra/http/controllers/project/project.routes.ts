import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";
import { patchProjectGeneralInfo } from "./patch-project-general-info.controller";

export async function projectsRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
	app.register(patchProjectGeneralInfo);
}

import { FastifyInstance } from "fastify";
import { createProjectType } from "./create-project-type.controller";
import { getProjectTypeByName } from "./get-project-type-by-id.controller";
import { getProjectTypes } from "./get-project-types.controller";

export async function projectTypeRoutes(app: FastifyInstance) {
	app.register(createProjectType);
	app.register(getProjectTypeByName);
	app.register(getProjectTypes);
}

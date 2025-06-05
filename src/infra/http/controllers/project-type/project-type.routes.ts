import { FastifyInstance } from "fastify";
import { createProjectType } from "./create-project-type.controller";
import { getProjectTypes } from "./get-project-types.controller";
import { getProjectTypesByOpportunityId } from "./get-project-type-by-opportunity-ids.controller";

export async function projectTypesRoutes(app: FastifyInstance) {
	app.register(createProjectType);
	app.register(getProjectTypes);
	app.register(getProjectTypesByOpportunityId);
}

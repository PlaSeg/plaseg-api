import type { FastifyInstance } from "fastify";
import { createOpportunity } from "./create-opportunity.controller";
import { getOpportunities } from "./get-opportunities.controller";
import { getOpportunityById } from "./get-opportunity-by-id.controller";
import { updateOpportunity } from "./update-opportunity.controller";

export async function opportunitiesRoutes(app: FastifyInstance) {
	app.register(createOpportunity);
	app.register(getOpportunities);
	app.register(getOpportunityById);
	app.register(updateOpportunity);
}

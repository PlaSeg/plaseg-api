import { FastifyInstance } from "fastify";
import { createProjectPartially } from "./create-project-partially.controller";
import { patchProjectGeneralInfo } from "./patch-project-general-info.controller";
import { createProjectRequestedItem } from "./create-project-requested-item.controller";
import { patchProjectDocumentField } from "./patch-project-document-field.controller";

export async function projectsRoutes(app: FastifyInstance) {
	app.register(createProjectPartially);
	app.register(patchProjectGeneralInfo);
	app.register(createProjectRequestedItem);
	app.register(patchProjectDocumentField);
}

import { FastifyInstance } from "fastify";
import { createMunicipality } from "./create-municipality.controller";
import { getMunicipalityUsers } from "./get-municipality-users.controller";
import { patchAllowedMunicipalityUser } from "./patch-allowed-municipality-user.controller";

export function municipalityRoutes(app: FastifyInstance) {
	app.register(createMunicipality);
	app.register(getMunicipalityUsers);
	app.register(patchAllowedMunicipalityUser);
}

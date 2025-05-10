import { FastifyInstance } from "fastify";
import { createAllocationDepartment } from "./create-allocation-department.controller";
import { createMaintenanceContract } from "./create-maintenance-contract.controller";
import { createManagement } from "./create-management.controller";
import { createMunicipality } from "./create-municipality.controller";
import { createProjectPartnership } from "./create-project-partnership.controller";
import { createQualifiedStaff } from "./create-qualified-staff.controller";

export function municipalityRoutes(app: FastifyInstance) {
	app.register(createMunicipality);
	app.register(createQualifiedStaff);
	app.register(createProjectPartnership);
	app.register(createAllocationDepartment);
	app.register(createManagement);
	app.register(createMaintenanceContract);
}

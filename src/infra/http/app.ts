import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import { errorHandler } from "./error-handler";
import { authRoutes } from "./controllers/auth/auth.routes";

import { createMunicipality } from "./controllers/municipality/create-municipality.controller";
import { createQualifiedStaff } from "./controllers/municipality/create-qualified-staff.controller";
import { createProjectPartnership } from "./controllers/municipality/create-project-partnership.controller";
import { createAllocationDepartment } from "./controllers/municipality/create-allocation-department.controller";
import { createManagement } from "./controllers/municipality/create-management.controller";
import { createMaintenanceContract } from "./controllers/municipality/create-maintenance-contract.controller";

import { opportunitiesRoutes } from "./controllers/opportunities/opportunities.routes";
import { getOpportunityById } from "./controllers/opportunities/get-opportunity-by-id.controller";
import { productsRoutes } from "./controllers/products/products.routes";

const version = "1.0.0 - Release 1";

export function buildApp(app = fastify().withTypeProvider<ZodTypeProvider>()) {
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);
	app.setErrorHandler(errorHandler);
	app.register(fastifyCors);
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: `PlaSeg API - ${process.env.NODE_ENV} - [Version: ${version}]`,
				description:
					"API para uma plataforma de criação automatizada de projetos municipais.",
				version: version,
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	});
	app.register(fastifySwaggerUI, {
		routePrefix: "/",
	});
	app.register(fastifyJwt, {
		secret: process.env.JWT_SECRET || "secret",
	});
	app.register(authRoutes);
	app.register(opportunitiesRoutes);
	app.register(productsRoutes);
	app.register(createMunicipality);
	app.register(createQualifiedStaff);
	app.register(createProjectPartnership);
	app.register(createAllocationDepartment);
	app.register(createManagement);
	app.register(createMaintenanceContract);


	return app;
}

export const app = buildApp();

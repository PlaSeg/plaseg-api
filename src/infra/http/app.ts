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

import { env } from "../env/env";
import { errorHandler } from "./error-handler";
import { authRoutes } from "./controllers/auth/auth.routes";
import { createMunicipality } from "./controllers/municipality/create-municipality.controller";
import { createQualifiedStaff } from "./controllers/municipality/create-qualified-staff.controller";
import { createProjectPartnership } from "./controllers/municipality/create-project-partnership.controller";
import { createAllocationDepartment } from "./controllers/municipality/create-allocation-department";

const version = "1.0.0 - Release 1";

export function buildApp(app = fastify().withTypeProvider<ZodTypeProvider>()) {
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);
	app.setErrorHandler(errorHandler);
	app.register(fastifyCors);
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: `PlaSeg API - ${env.NODE_ENV} - [Version: ${version}]`,
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
		secret: env.JWT_SECRET,
	});
	app.register(authRoutes);
	app.register(createMunicipality);
	app.register(createQualifiedStaff);
	app.register(createProjectPartnership);
	app.register(createAllocationDepartment);

	return app;
}

export const app = buildApp();

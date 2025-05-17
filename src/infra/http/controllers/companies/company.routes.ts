import { FastifyInstance } from "fastify";
import { createCompany } from "./create-company.controller";

export function companyRoutes(app: FastifyInstance) {
	app.register(createCompany);
}

import { FastifyInstance } from "fastify";
import { createPriceRegistrationRecord } from "./create-price-registration-record.controller";

export function priceRegistrationRecordRoutes(app: FastifyInstance) {
	app.register(createPriceRegistrationRecord);
}

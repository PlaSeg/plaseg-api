import { FastifyInstance } from "fastify";
import { createPriceRegistrationRecord } from "./create-price-registration-record.controller";
import { getPriceRegistrationRecords } from "./get-price-registration-record.controller";

export async function priceRegistrationRecordsRoutes(app: FastifyInstance) {
	app.register(createPriceRegistrationRecord);
	app.register(getPriceRegistrationRecords);
}

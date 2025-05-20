import { FastifyInstance } from "fastify";
import { createBaseProduct } from "./create-base-product.controller";
import { getBaseProducts } from "./get-base-products.controller";
import { getBaseProductById } from "./get-base-product-by-id.controller";
import { createSpecificProduct } from "./create-specific-product.controller";
import { getSpecificProducts } from "./get-specific-product.controller";

export async function productsRoutes(app: FastifyInstance) {
	app.register(createBaseProduct);
	app.register(getBaseProducts);
	app.register(getBaseProductById);
	app.register(createSpecificProduct);
	app.register(getSpecificProducts);
}

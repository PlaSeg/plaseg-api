import type { FastifyInstance } from "fastify";
import { createBaseProduct } from "./create-base-product.controller";
import { getBaseProducts } from "./get-base-products.controller";
import { getBaseProductById } from "./get-base-product-by-id.controller";

export async function productsRoutes(app: FastifyInstance) {
	app.register(createBaseProduct);
	app.register(getBaseProducts);
	app.register(getBaseProductById);
}

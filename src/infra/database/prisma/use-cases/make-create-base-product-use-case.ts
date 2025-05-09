import { PrismaBaseProductsRepository } from "../repositories/prisma-base-product-repository";
import { CreateBaseProductUseCase } from "../../../../domain/use-cases/create-base-product";

export function makeCreateBaseProductUseCase() {
    const maintenanceContractsRepository = new PrismaBaseProductsRepository();

    return new CreateBaseProductUseCase(maintenanceContractsRepository);
}

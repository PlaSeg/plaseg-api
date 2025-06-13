import { PrismaClient } from "@prisma/client";

export const baseProducts = (typeId: string) => {
	return [
		{
			code: "ARM-0001",
			name: "Pistola Glock 9mm",
			technicalDescription:
				"Pistola semiautomática calibre 9mm, capacidade de 17 tiros, acabamento em polímero resistente, sistema de segurança Safe Action.",
			unitValue: 4500,
			typeId: typeId,
			budget1: 4400,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 4600,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 4700,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
	];
};

export async function seedBaseProducts(prisma: PrismaClient, typeId: string) {
	console.log("🌱 Seeding base products...");

	for (const baseProduct of baseProducts(typeId)) {
		await prisma.baseProduct.create({
			data: baseProduct,
		});
	}

	console.log("✅ Base products seeded successfully");
}

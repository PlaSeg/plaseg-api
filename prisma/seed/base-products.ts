import { PrismaClient } from "@prisma/client";

export async function seedBaseProducts(prisma: PrismaClient) {
	console.log("🌱 Seeding base products...");

	const glockType = await prisma.type.findUnique({
		where: { description: "Pistola Glock 9mm" },
	});

	if (!glockType) {
		throw new Error("Glock type not found");
	}

	const carType = await prisma.type.findUnique({
		where: { description: "Viaturas" },
	});

	if (!carType) {
		throw new Error("Car type not found");
	}

	await prisma.baseProduct.create({
		data: {
			code: "ARM-0001",
			name: "Pistola Glock G17 Gen.5",
			technicalDescription:
				"Pistola semiautomática calibre 9mm, capacidade de 17 tiros, acabamento em polímero resistente, sistema de segurança Safe Action.",
			unitValue: 9200,
			typeId: glockType.id,
			budget1: 9100,
			budget1Validity: "2025-11-01T12:36:26.773Z",
			budget2: 9200,
			budget2Validity: "2025-11-02T12:36:26.773Z",
			budget3: 9300,
			budget3Validity: "2025-11-03T12:36:26.773Z",
		},
	});

	await prisma.baseProduct.create({
		data: {
			code: "VTR-0001",
			name: "Viatura Chevrolet Onix Plus 1.0 Turbo",
			technicalDescription:
				"Veículo utilitário 4 portas, motor 1.0 turbo flex, câmbio manual 6 velocidades, ar condicionado, direção elétrica, airbags duplos, sistema de som integrado.",
			unitValue: 85000,
			typeId: carType.id,
			budget1: 84000,
			budget1Validity: "2025-03-15T10:00:00.000Z",
			budget2: 85000,
			budget2Validity: "2025-04-15T10:00:00.000Z",
			budget3: 86000,
			budget3Validity: "2025-05-15T10:00:00.000Z",
		},
	});

	console.log("✅ Base products seeded successfully");
}

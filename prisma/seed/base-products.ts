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
		{
			code: "ARM-0002",
			name: "Pistola Beretta 92",
			technicalDescription:
				"Pistola semiautomática calibre 9mm, capacidade de 15 tiros, corpo em liga de alumínio, acabamento oxidado.",
			unitValue: 5100,
			typeId: typeId,
			budget1: 5000,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 5200,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 5300,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "ARM-0003",
			name: "Fuzil AR-15",
			technicalDescription:
				"Fuzil semiautomático calibre 5.56x45mm, carregador de 30 tiros, cano de 20 polegadas, sistema de gás direto.",
			unitValue: 9800,
			typeId: typeId,
			budget1: 9700,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 9900,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 10000,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "ARM-0004",
			name: "Fuzil AK-47",
			technicalDescription:
				"Fuzil semiautomático calibre 7.62x39mm, carregador de 30 tiros, cano de 16 polegadas, sistema de pistão a gás.",
			unitValue: 8500,
			typeId: typeId,
			budget1: 8400,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 8600,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 8700,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "ARM-0005",
			name: "Revólver Taurus RT608",
			technicalDescription:
				"Revólver calibre .357 Magnum, tambor de 8 tiros, cano de 6,5 polegadas, acabamento inox.",
			unitValue: 3900,
			typeId: typeId,
			budget1: 3850,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 3950,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 4000,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "ARM-0006",
			name: "Espingarda Pump Calibre 12",
			technicalDescription:
				"Espingarda pump-action calibre 12, capacidade de 5+1 tiros, cano de 18 polegadas, coronha fixa.",
			unitValue: 4200,
			typeId: typeId,
			budget1: 4100,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 4300,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 4400,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "ARM-0007",
			name: "Submetralhadora MP5",
			technicalDescription:
				"Submetralhadora 9mm, cadência de tiro de 800 tiros/min, carregador de 30 tiros, sistema de tranca rotativa.",
			unitValue: 7200,
			typeId: typeId,
			budget1: 7100,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 7300,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 7400,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "EQP-0001",
			name: "Colete Balístico Nível III-A",
			technicalDescription:
				"Colete balístico nível III-A, proteção contra projéteis de até 9mm, sistema de ajuste lateral, peso reduzido.",
			unitValue: 2800,
			typeId: typeId,
			budget1: 2750,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 2850,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 2900,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "EQP-0002",
			name: "Câmera Corporal Policial",
			technicalDescription:
				"Câmera corporal HD com bateria de 12 horas, armazenamento de 64GB, à prova d'água, visão noturna.",
			unitValue: 1500,
			typeId: typeId,
			budget1: 1450,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 1550,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 1600,
			budget3Validity: "2025-05-12T12:36:26.773Z",
		},
		{
			code: "VEI-0001",
			name: "Viatura SUV Táctica",
			technicalDescription:
				"SUV 4x4, motor 2.0 turbo diesel, blindagem nível III-A, suporte para armamento tático, sistema de comunicação integrado.",
			unitValue: 220000,
			typeId: typeId,
			budget1: 215000,
			budget1Validity: "2025-05-12T12:36:26.773Z",
			budget2: 225000,
			budget2Validity: "2025-05-12T12:36:26.773Z",
			budget3: 230000,
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

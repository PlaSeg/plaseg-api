import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

export async function seedMunicipality(prisma: PrismaClient) {
	console.log("🌱 Seeding municipality...");

	const user = await prisma.user.create({
		data: {
			name: "Municipio",
			email: "municipio@plaseg.com",
			document: "12345678901",
			phone: "11976769999",
			password: await hash("00000000", 6),
			role: "MUNICIPALITY",
			allowed: true,
		},
	});

	const municipality = await prisma.municipality.create({
		data: {
			name: "Teresina",
			guardInitialDate: new Date("2024-01-15"),
			guardCount: 10,
			trafficInitialDate: new Date("2024-02-01"),
			trafficCount: 10,
			federativeUnit: "PI",
			unitType: "MUNICIPALITY",
			userId: user.id,
		},
	});

	await prisma.allocationDepartment.create({
		data: {
			description: "Departamento de Segurança Pública",
			address: "Rua da Segurança, 123 - Centro, Teresina - PI",
			municipalityId: municipality.id,
		},
	});

	await prisma.maintenanceContract.create({
		data: {
			description: "Contrato de Manutenção de Equipamentos de Segurança",
			attachment: "contrato_manutencao_equipamentos_2024.pdf",
			municipalityId: municipality.id,
		},
	});

	console.log("✅ Municipality seeded successfully");
}

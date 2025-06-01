import { PrismaClient } from "@prisma/client";

export const requestedItems = (
	projectId: string,
	baseProductId: string,
	allocationDepartmentId: string,
	maintenanceContractId: string
) => {
	return [
		{
			quantity: 10,
			projectId,
			baseProductId,
			allocationDepartmentId,
			maintenanceContractId,
		},
		{
			quantity: 5,
			projectId,
			baseProductId,
			allocationDepartmentId,
			maintenanceContractId,
		},
	];
};

export async function seedRequestedItems(prisma: PrismaClient) {
	console.log("🌱 Seeding requested items...");

	
	const type = await prisma.type.create({
		data: {
			description: "Tipo de projeto para teste",
			group: "CATEGORY",
		},
	});

	const baseProduct = await prisma.baseProduct.create({
		data: {
			code: "BP001",
			name: "Pistola 9mm",
			technicalDescription: "Pistola semiautomática calibre 9mm",
			budget1: 2000,
			budget1Validity: new Date(),
			budget2: 2200,
			budget2Validity: new Date(),
			budget3: 2400,
			budget3Validity: new Date(),
			unitValue: 2000,
			typeId: type.id,
		},
	});

	const opportunity = await prisma.opportunity.create({
		data: {
			title: "Oportunidade de Segurança Pública",
			slug: "oportunidade-seguranca-publica",
			responsibleAgency: "Secretaria de Segurança Pública",
			description: "Implementação de sistema de segurança pública",
			availableValue: 1000000,
			minValue: 100000,
			maxValue: 1000000,
			initialDeadline: new Date(),
			finalDeadline: new Date(),
			requiresCounterpart: false,
			typeId: type.id,
		},
	});

	const projectType = await prisma.projectType.findFirstOrThrow({
		where: {
			name: "Projeto de Segurança Pública",
		},
	});

	const project = await prisma.project.create({
		data: {
			title: "Projeto de Segurança Pública",
			projectTypeId: projectType.id,
			opportunityId: opportunity.id,
		},
	});

	const municipalityUser = await prisma.user.findFirstOrThrow({
		where: {
			role: "MUNICIPALITY",
		},
	});

	const municipality = await prisma.municipality.create({
		data: {
			name: "São Paulo",
			guardInitialDate: new Date(),
			guardCount: 1000,
			trafficInitialDate: new Date(),
			trafficCount: 500,
			federativeUnit: "SP",
			unitType: "MUNICIPALITY",
			userId: municipalityUser.id,
		},
	});

	const allocationDepartment = await prisma.allocationDepartment.create({
		data: {
			description: "Departamento de Alocação",
			address: "Rua Exemplo, 123",
			municipalityId: municipality.id,
		},
	});

	const maintenanceContract = await prisma.maintenanceContract.create({
		data: {
			description: "Contrato de Manutenção",
			attachment: "contrato.pdf",
			municipalityId: municipality.id,
		},
	});

	for (const requestedItem of requestedItems(
		project.id,
		baseProduct.id,
		allocationDepartment.id,
		maintenanceContract.id
	)) {
		await prisma.requestedItem.create({
			data: requestedItem,
		});
	}

	console.log("✅ Requested items seeded successfully");
}

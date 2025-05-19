import { PrismaClient, Role, TypeGroup } from "@prisma/client";
import { types } from "./seed/types";
import { opportunities } from "./seed/opportunities";
import { baseProducts } from "./seed/base-products";
import { users } from "./seed/users";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
	await prisma.opportunity.deleteMany();
	await prisma.baseProduct.deleteMany();
	await prisma.type.deleteMany();
	await prisma.user.deleteMany();

	users.forEach(async (user) => {
		await prisma.user.create({
			data: {
				...user,
				password: await hash(user.password, 6),
			},
		});
	});

	types().forEach(async (type) => {
		await prisma.type.create({
			data: {
				description: type.description,
				group: type.group,
				children: {
					create: type.children?.create,
				},
			},
		});
	});

	const edital = await prisma.type.create({
		data: {
			description: "Edital",
			group: TypeGroup.OPPORTUNITY,
		},
	});

	opportunities(edital.id).forEach(async (opportunity) => {
		await prisma.opportunity.create({
			data: opportunity,
		});
	});

	const weapon = await prisma.type.create({
		data: {
			description: "Armas",
			group: TypeGroup.CATEGORY,
		},
	});

	baseProducts(weapon.id).forEach(async (baseProduct) => {
		await prisma.baseProduct.create({
			data: baseProduct,
		});
	});

	const ceo = await prisma.user.create({
		data: {
			name: "Acme",
			phone: "11990099999",
			document: "44433322211",
			email: "acme@gmail.com",
			password: "00000000",
			role: Role.COMPANY,
		},
	});

	const company = await prisma.company.create({
		data: {
			cnpj: "12345678900000",
			legalName: "Acme",
			tradeName: "Acme",
			address: "Rua 1",
			email: "acme@gmail.com",
			phone: "11990099999",
			site: "https://acme.com",
			portfolioDescription: "Descrição do portfólio",
			userId: ceo.id,
		},
	});

	const type = await prisma.type.create({
		data: {
			description: "Base Product",
			group: TypeGroup.CATEGORY,
		},
	});

	const baseProduct = await prisma.baseProduct.create({
		data: {
			code: "12345678900000",
			name: "Base Product",
			technicalDescription: "Descrição técnica do produto",
			unitValue: 100,
			typeId: type.id,
			budget1: 100,
			budget1Validity: new Date(),
			budget2: 100,
			budget2Validity: new Date(),
			budget3: 100,
			budget3Validity: new Date(),
		},
	});

	const specificProduct = await prisma.specificProduct.create({
		data: {
			brand: "Brand",
			model: "Model",
			description: "Description",
			unitValue: 100,
			warrantyMonths: 12,
			budget: 100,
			budgetValidity: new Date(),
			baseProductId: baseProduct.id,
			companyId: company.id,
		},
	});

	await prisma.priceRegistrationRecord.create({
		data: {
			number: "12345678900000",
			publicAgency: "Public Agency",
			year: 2025,
			effectiveDate: new Date(),
			status: "ACTIVE",
			userId: ceo.id,
			priceRegistrationRecordItems: {
				create: {
					specificProductId: specificProduct.id,
					unitValue: 100,
					quantity: 50,
					minAdherenceQuantity: 40,
					maxAdherenceQuantity: 60,
				},
			},
		},
	});
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

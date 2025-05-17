import { PrismaClient, TypeGroup } from "@prisma/client";
import { types } from "./seed/types";
import { opportunities } from "./seed/opportunities";
import { baseProducts } from "./seed/base-products";
import { administrators } from "./seed/administrators";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
	await prisma.opportunity.deleteMany();
	await prisma.baseProduct.deleteMany();
	await prisma.type.deleteMany();
	await prisma.user.deleteMany();

	administrators.forEach(async (administrator) => {
		await prisma.user.create({
			data: {
				...administrator,
				password: await hash(administrator.password, 6),
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

	console.log("Seed complete");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

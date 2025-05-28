import { ProjectType } from "../../../../domain/entities/project-type";
import { createFieldsRecursively } from "../../../../domain/helpers/field-helper";
import { ProjectTypesRepository } from "../../../../domain/repositories/project-type-repository";
import { PrismaProjectTypeMapper } from "../mappers/prisma-project-type-mapper";
import { prisma } from "../prisma";

export class PrismaProjectTypesRepository implements ProjectTypesRepository {
    async create(projectType: ProjectType): Promise<void> {
        const data = PrismaProjectTypeMapper.toPrisma(projectType)

		await prisma.projectType
			.create({
				data
			})
			.then(async (proj) => {
				await createFieldsRecursively(projectType.fields, proj.id);
			});
	}

	async findById(id: string): Promise<ProjectType | null> {
		const data = await prisma.projectType.findUnique({
			where: {
				id,
			},
			include: {
				fields: true
			}
		});

		if (!data) {
			return null;
		}

		return PrismaProjectTypeMapper.toDomain({
			...data
		});
	}

	async findMany(): Promise<ProjectType[]> {
		const data = await prisma.projectType.findMany({
			include: {
				fields: true,
			},
		});

		return data.map(PrismaProjectTypeMapper.toDomain)
	}

	async findByName(name: string): Promise<ProjectType | null> {
		const data = await prisma.projectType.findUnique({
			where: {
				name,
			},
			include: {
				fields: true,
			},
		});

		if (!data) {
			return null;
		}

		return PrismaProjectTypeMapper.toDomain({
			...data,
		});
	}
}

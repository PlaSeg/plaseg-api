import { prisma } from "../prisma";

import { PrismaDocumentMapper } from "../mappers/prisma-document-mapper";
import { createFieldsRecursively } from "../../../../domain/helpers/field-helper";
import { ProjectsRepository } from "../../../../domain/repositories/project-repository";
import { Project } from "../../../../domain/entities/project";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";
import { ProjectWithMoreInfo } from "../../../../domain/entities/value-objects/project-with-more-info";
import { PrismaProjectWithMoreInfoMapper } from "../mappers/prisma-project-with-more-info-mapper";

export class PrismaProjectsRepository implements ProjectsRepository {
	async findById(id: string): Promise<Project | null> {
		const project = await prisma.project.findUnique({
			where: {
				id,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
				requestedItems: true,
			},
		});

		if (!project) {
			return null;
		}

		return PrismaProjectMapper.toDomain({
			...project,
		});
	}

	async findByIdWithMoreInfo(id: string): Promise<ProjectWithMoreInfo | null> {
		const project = await prisma.project.findUnique({
			where: {
				id,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
				requestedItems: {
					include: {
						baseProduct: {
							select: {
								id: true,
								name: true,
								unitValue: true,
							},
						},
					},
				},
				opportunity: {
					select: {
						id: true,
						title: true,
						counterpartPercentage: true,
						requiresCounterpart: true,
						maxValue: true,
						availableValue: true,
						minValue: true,
					},
				},
				projectType: {
					select: {
						id: true,
						name: true,
					},
				},
				municipality: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		if (!project) {
			return null;
		}

		return PrismaProjectWithMoreInfoMapper.toDomain(project);
	}

	async findByTitle(title: string): Promise<Project[] | null> {
		const projects = await prisma.project.findMany({
			where: {
				title,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
				requestedItems: true,
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async findMany(): Promise<Project[]> {
		const projects = await prisma.project.findMany({
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
				requestedItems: true,
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async findManyByMunicipality(municipalityId: string): Promise<Project[]> {
		const projects = await prisma.project.findMany({
			where: {
				municipalityId,
			},
			include: {
				documents: {
					include: {
						fields: true,
					},
				},
				requestedItems: true,
			},
		});

		return projects.map((project) =>
			PrismaProjectMapper.toDomain({
				...project,
			})
		);
	}

	async create(project: Project): Promise<void> {
		await prisma.$transaction(async (tx) => {
			const data = PrismaProjectMapper.toPrisma(project);
			await tx.project.create({ data });

			for (const document of project.documents) {
				const docData = PrismaDocumentMapper.toPrisma(
					document,
					project.id.toString(),
					"projectId"
				);
				await tx.document
					.create({
						data: docData,
					})
					.then(async (doc) => {
						await createFieldsRecursively(document.fields, doc.id, tx);
					});
			}
		});
	}

	async updateGeneralInfo(
		projectId: string,
		data: {
			responsibleCpf?: string;
			responsibleName?: string;
			responsibleEmail?: string;
			responsiblePhone?: string;
			counterpartCapitalItem?: string;
			counterpartCapitalValue?: number;
			counterpartOperatingCostCode?: string;
			counterpartOperatingCostValue?: number;
			totalValue?: number;
			requestedValue?: number;
			baseValue?: number;
		}
	): Promise<void> {
		await prisma.project.update({
			where: {
				id: projectId,
			},
			data: {
				responsibleCpf: data.responsibleCpf,
				responsibleName: data.responsibleName,
				responsibleEmail: data.responsibleEmail,
				responsiblePhone: data.responsiblePhone,
				counterpartCapitalItem: data.counterpartCapitalItem,
				counterpartCapitalValue: data.counterpartCapitalValue,
				counterpartOperatingCostCode: data.counterpartOperatingCostCode,
				counterpartOperatingCostValue: data.counterpartOperatingCostValue,
				totalValue: data.totalValue,
				requestedValue: data.requestedValue,
				baseValue: data.baseValue,
			},
		});
	}

	async addRequestedItem(
		projectId: string,
		baseProductId: string,
		allocationDepartmentId: string,
		maintenanceContractId: string,
		quantity: number
	): Promise<void> {
		await prisma.project.update({
			where: { id: projectId },
			data: {
				requestedItems: {
					create: {
						baseProductId,
						quantity,
						allocationDepartmentId,
						maintenanceContractId,
					},
				},
			},
		});
	}
}

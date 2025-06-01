import { prisma } from "../prisma";
import { Opportunity } from "../../../../domain/entities/opportunity";
import { PrismaOpportunityMapper } from "../mappers/prisma-opportunity-mapper";
import { PrismaDocumentMapper } from "../mappers/prisma-document-mapper";
import { createFieldsRecursively } from "../../../../domain/helpers/field-helper";
import { ProjectsRepository } from "../../../../domain/repositories/project-repository";
import { Project } from "../../../../domain/entities/project";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";

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
            },
        });

        if (!project) {
            return null;
        }

        return PrismaProjectMapper.toDomain({
            ...project
        });
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
            },
        });

        return projects.map((project) =>
            PrismaProjectMapper.toDomain({
                ...project
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
            },
        });

        return projects.map((project) =>
            PrismaProjectMapper.toDomain({
                ...project
            })
        );
    }

    async create(project: Project, opportunityId: string, projectTypeId: string): Promise<void> {
        await prisma.$transaction(async tx => {
			const data = PrismaProjectMapper.toPrisma(project, opportunityId, projectTypeId);
			await tx.project.create({ data });

			for (const document of project.documents) {
				const docData = PrismaDocumentMapper.toPrisma(document, project.id.toString(), "projectId")
				await tx.document
					.create({
						data: docData
					})
					.then(async (doc) => {
						await createFieldsRecursively(document.fields, doc.id, tx);
					});
			}
  		})
    }
}

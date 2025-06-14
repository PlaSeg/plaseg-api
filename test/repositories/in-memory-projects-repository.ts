import { Project } from "../../src/domain/entities/project";
import { RequestedItem } from "../../src/domain/entities/requested-item";
import { ProjectsRepository } from "../../src/domain/repositories/project-repository";
import { ProjectWithMoreInfo } from "../../src/domain/entities/value-objects/project-with-more-info";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export class InMemoryProjectsRepository implements ProjectsRepository {
	public items: Project[] = [];

	async findById(id: string): Promise<Project | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		return project ?? null;
	}

	async findByIdWithMoreInfo(id: string): Promise<ProjectWithMoreInfo | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		if (!project) {
			return null;
		}

		return ProjectWithMoreInfo.create({
			id: project.id,
			title: project.title,
			responsibleCpf: project.responsibleCpf,
			responsibleName: project.responsibleName,
			responsibleEmail: project.responsibleEmail,
			responsiblePhone: project.responsiblePhone,
			counterpartCapitalItem: project.counterpartCapitalItem,
			counterpartCapitalValue: project.counterpartCapitalValue,
			counterpartOperatingCostCode: project.counterpartOperatingCostCode,
			counterpartOperatingCostValue: project.counterpartOperatingCostValue,
			totalValue: project.totalValue,
			requestedValue: project.requestedValue,
			baseValue: project.baseValue,
			createdAt: project.createdAt,
			updatedAt: project.updatedAt,
			documents: project.documents,
			municipality: {
				id: new UniqueEntityID(project.municipalityId),
				name: "Test Municipality",
			},
			opportunity: {
				id: new UniqueEntityID(project.opportunityId),
				title: "Test Opportunity",
				counterpartPercentage: 0,
				requiresCounterpart: false,
			},
			projectType: {
				id: new UniqueEntityID(project.projectTypeId),
				name: "Test Project Type",
			},
			requestedItems: project.requestedItems?.map((item) => ({
				id: item.id,
				quantity: item.quantity,
				baseProduct: {
					id: new UniqueEntityID(item.baseProductId),
					name: "Test Base Product",
					unitValue: 100,
				},
			})),
		});
	}

	async findByTitle(title: string): Promise<Project[] | null> {
		const projects = this.items.filter((project) => project.title === title);

		return projects.length > 0 ? projects : null;
	}

	async findMany(): Promise<Project[]> {
		return this.items;
	}

	async findManyByMunicipality(municipalityId: string): Promise<Project[]> {
		const projects = this.items.filter(
			(project) => project.municipalityId === municipalityId
		);

		return projects;
	}

	async create(project: Project): Promise<void> {
		this.items.push(project);
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
			baseValue?: number;
		}
	): Promise<void> {
		const projectIndex = this.items.findIndex(
			(project) => project.id.toString() === projectId
		);

		if (projectIndex >= 0) {
			const project = this.items[projectIndex];
			const updatedProject = Project.create(
				{
					title: project.title,
					documents: project.documents,
					opportunityId: project.opportunityId,
					projectTypeId: project.projectTypeId,
					municipalityId: project.municipalityId,
					responsibleCpf: data.responsibleCpf ?? project.responsibleCpf,
					responsibleName: data.responsibleName ?? project.responsibleName,
					responsibleEmail: data.responsibleEmail ?? project.responsibleEmail,
					responsiblePhone: data.responsiblePhone ?? project.responsiblePhone,
					counterpartCapitalItem:
						data.counterpartCapitalItem ?? project.counterpartCapitalItem,
					counterpartCapitalValue:
						data.counterpartCapitalValue ?? project.counterpartCapitalValue,
					counterpartOperatingCostCode:
						data.counterpartOperatingCostCode ??
						project.counterpartOperatingCostCode,
					counterpartOperatingCostValue:
						data.counterpartOperatingCostValue ??
						project.counterpartOperatingCostValue,
					baseValue: data.baseValue ?? project.baseValue,
					requestedItems: project.requestedItems,
				},
				project.id
			);

			this.items[projectIndex] = updatedProject;
		}
	}

	async addRequestedItem(
		projectId: string,
		baseProductId: string,
		allocationDepartmentId: string,
		maintenanceContractId: string,
		quantity: number
	): Promise<void> {
		const projectIndex = this.items.findIndex(
			(project) => project.id.toString() === projectId
		);

		if (projectIndex >= 0) {
			const project = this.items[projectIndex];
			const requestedItem = RequestedItem.create({
				projectId: project.id.toString(),
				baseProductId,
				quantity,
				allocationDepartmentId,
				maintenanceContractId,
			});
			project.requestedItems?.push(requestedItem);
		}
	}
}

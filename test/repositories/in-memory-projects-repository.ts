import { Project } from "../../src/domain/entities/project";
import { ProjectsRepository } from "../../src/domain/repositories/project-repository";

export class InMemoryProjectsRepository implements ProjectsRepository {
	public items: Project[] = [];

	async findById(id: string): Promise<Project | null> {
		const project = this.items.find((project) => project.id.toString() === id);

		return project ?? null;
	}

	async findByTitle(title: string): Promise<Project[] | null> {
		const projects = this.items.filter((project) => project.title === title);

		return projects.length > 0 ? projects : null;
	}

	async findMany(): Promise<Project[]> {
		return this.items;
	}

	async create(
		project: Project,
		_opportunityId: string,
		_projectTypeId: string
	): Promise<void> {
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
			totalValue?: number;
			requestedValue?: number;
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
					totalValue: data.totalValue ?? project.totalValue,
					requestedValue: data.requestedValue ?? project.requestedValue,
					baseValue: data.baseValue ?? project.baseValue,
				},
				project.id
			);

			this.items[projectIndex] = updatedProject;
		}
	}
}

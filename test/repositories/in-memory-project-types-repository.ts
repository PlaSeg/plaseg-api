import { ProjectType } from "../../src/domain/entities/project-type";
import { ProjectTypesRepository } from "../../src/domain/repositories/project-type-repository";

export class InMemoryProjectTypesRepository implements ProjectTypesRepository {
	public items: ProjectType[] = [];

	async create(projectType: ProjectType): Promise<void> {
		this.items.push(projectType);
	}

	async findByName(name: string): Promise<ProjectType | null> {
		const projectType = this.items.find((item) => item.name === name);

		if (!projectType) {
			return null;
		}

		return projectType;
	}

	async findMany(): Promise<ProjectType[]> {
		return this.items;
	}

	async findById(id: string): Promise<ProjectType | null> {
		const projectType = this.items.find((item) => item.id.toString() === id);

		if (!projectType) {
			return null;
		}

		return projectType;
	}
}

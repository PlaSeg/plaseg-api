import { ProjectType } from "../entities/project-type";

export interface ProjectTypesRepository {
	create(projectType: ProjectType): Promise<void>;
	findById(id: string): Promise<ProjectType | null>;
	findByName(name: string): Promise<ProjectType | null>;
	findMany(): Promise<ProjectType[]>;
}

import { ProjectType } from "../entities/project-type";

export interface ProjectTypesRepository {
	create(projectType: ProjectType): Promise<void>;
	findByName(name: string): Promise<ProjectType | null>;
}

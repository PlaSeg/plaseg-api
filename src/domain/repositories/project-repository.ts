import { Project } from "../entities/project";

export interface ProjectsRepository {
    findById(id: string): Promise<Project | null>;
    findMany(): Promise<Project[]>;
    findByTitle(title: string): Promise<Project[] | null>;
    create(project: Project, opportunityId: string, projectTypeId: string): Promise<void>;
}

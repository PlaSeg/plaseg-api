import { Project } from "../entities/project";

export interface ProjectsRepository {
	findById(id: string): Promise<Project | null>;
	findMany(): Promise<Project[]>;
	findByTitle(title: string): Promise<Project[] | null>;
	findManyByMunicipality(municipalityId: string): Promise<Project[]>;
	create(
		project: Project
	): Promise<void>;
	updateGeneralInfo(
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
	): Promise<void>;
	addRequestedItem(
		projectId: string,
		baseProductId: string,
		allocationDepartmentId: string,
		maintenanceContractId: string,
		quantity: number
	): Promise<void>;
}

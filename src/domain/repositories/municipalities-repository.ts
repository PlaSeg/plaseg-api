import { AllocationDepartment } from "../entities/allocation-department";
import { MaintenanceContract } from "../entities/maintenance-contract";
import { Municipality } from "../entities/municipality";

export interface MunicipalitiesRepository {
	findById(id: string): Promise<Municipality | null>;
	findByUserId(userId: string): Promise<Municipality | null>;
	findAllocationDepartments(municipalityId: string): Promise<AllocationDepartment[]>;
	findMaintenanceContracts(municipalityId: string): Promise<MaintenanceContract[]>;
	findByName(name: string): Promise<Municipality | null>;
	create(municipality: Municipality): Promise<void>;
}

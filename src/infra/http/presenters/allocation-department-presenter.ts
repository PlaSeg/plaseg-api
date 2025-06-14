import { AllocationDepartment } from "../../../domain/entities/allocation-department";
import { AllocationDepartmentResponse } from "../schemas/allocation-department";

export class AllocationDepartmentPresenter {
	static toHTTP(allocationDepartment: AllocationDepartment): AllocationDepartmentResponse {
		return {
			id: allocationDepartment.id.toString(),
			description: allocationDepartment.description,
			address: allocationDepartment.address,
			createdAt: allocationDepartment.createdAt,
			updatedAt: allocationDepartment.updatedAt ?? null,
		};
	}
}

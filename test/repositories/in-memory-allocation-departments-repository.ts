import { AllocationDepartment } from "../../src/domain/entities/allocation-department";
import { AllocationDeparmentsRepository } from "../../src/domain/repositories/allocation-department";

export class InMemoryAllocationDepartmentsRepository
	implements AllocationDeparmentsRepository
{
	public items: AllocationDepartment[] = [];

	async findById(id: string): Promise<AllocationDepartment | null> {
		const allocationDepartment = this.items.find(
			(department) => department.id.toString() === id
		);

		if (!allocationDepartment) {
			return null;
		}

		return allocationDepartment;
	}

	async findByDescription(
		description: string
	): Promise<AllocationDepartment | null> {
		const allocationDepartment = this.items.find(
			(department) => department.description === description
		);

		if (!allocationDepartment) {
			return null;
		}

		return allocationDepartment;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<AllocationDepartment[] | null> {
		const allocationDepartments = this.items.filter(
			(department) => department.municipalityId === municipalityId
		);

		if (!allocationDepartments.length) {
			return null;
		}

		return allocationDepartments;
	}

	async create(allocationDepartment: AllocationDepartment): Promise<void> {
		this.items.push(allocationDepartment);
	}
}

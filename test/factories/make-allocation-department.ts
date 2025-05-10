import { AllocationDepartment } from "../../src/domain/entities/allocation-department";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeAllocationDepartment(
	override: Partial<AllocationDepartment> = {},
	id?: UniqueEntityID
) {
	const allocationDepartment = AllocationDepartment.create(
		{
			description: "Test Department",
			address: "Test Address",
			municipalityId: "municipality-1",
			...override,
		},
		id
	);

	return allocationDepartment;
}

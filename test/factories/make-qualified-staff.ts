import {
	QualifiedStaff,
	QualifiedStaffProps,
} from "../../src/domain/entities/qualified-staff";
import { EmploymentType } from "../../src/domain/entities/value-objects/employment-type";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeQualifiedStaff(
	override: Partial<QualifiedStaffProps> = {}
) {
	const qualifiedStaff = QualifiedStaff.create({
		name: "John Doe",
		sector: "Administration",
		education: "Bachelor's Degree",
		experience: "5 years",
		employmentType: EmploymentType.create("CLT"),
		document: "12345678900",
		isResponsible: true,
		municipalityId: new UniqueEntityID().toString(),
		...override,
	});

	return qualifiedStaff;
}

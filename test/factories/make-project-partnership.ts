import {
	ProjectPartnership,
	ProjectPartnershipProps,
} from "../../src/domain/entities/project-partnership";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeProjectPartnership(
	override: Partial<ProjectPartnershipProps> = {}
) {
	const projectPartnership = ProjectPartnership.create({
		term: "Term 2024",
		agency: "Agency XYZ",
		objective: "Improve infrastructure",
		status: "Active",
		municipalityId: new UniqueEntityID().toString(),
		...override,
	});

	return projectPartnership;
}

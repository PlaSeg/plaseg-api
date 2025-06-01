import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Project, ProjectProps } from "../../src/domain/entities/project";
import { Document } from "../../src/domain/entities/document";

export function makeProject(
	override: Partial<ProjectProps> = {},
	id?: UniqueEntityID
) {
	const project = Project.create(
		{
			title: "Test Project",
			documents: [],
			...override,
		},
		id
	);

	return project;
}

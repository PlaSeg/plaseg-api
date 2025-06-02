import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Project, ProjectProps } from "../../src/domain/entities/project";

export function makeProject(
	override: Partial<ProjectProps> = {},
	id?: UniqueEntityID
) {
	const project = Project.create(
		{
			title: "Test Project",
			documents: [],
			responsibleCpf: "00000000000",
			responsibleName: "John Doe",
			responsibleEmail: "john.doe@example.com",
			responsiblePhone: "(00) 00000-0000",
			counterpartCapitalItem: "Some item",
			counterpartCapitalValue: 1000,
			counterpartOperatingCostCode: "OP001",
			counterpartOperatingCostValue: 500,
			totalValue: 1500,
			requestedValue: 1200,
			baseValue: 1000,
			opportunityId: new UniqueEntityID().toString(), // valor fake por padrão
			projectTypeId: new UniqueEntityID().toString(), // valor fake por padrão
			...override, // sobrescreve qualquer campo acima
		},
		id
	);

	return project;
}

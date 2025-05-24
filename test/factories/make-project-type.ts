import { ProjectType } from "../../src/domain/entities/project-type";
import { Field } from "../../src/domain/entities/field";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeField(override: Partial<Field> = {}) {
	const field = Field.create({
		name: "Campo Teste",
		value: "Valor Teste",
		fields: null,
		...override,
	});

	return field;
}

export function makeProjectType(override: Partial<ProjectType> = {}) {
	const field1 = makeField({ name: "Campo 1" });
	const field2 = makeField({
		name: "Campo 2",
		fields: null,
		projectTypeId: new UniqueEntityID().toString(),
	});

	const projectType = ProjectType.create({
		name: "Tipo de Projeto Teste",
		fields: [field1, field2],
		...override,
	});

	return projectType;
}

import { Field } from "../../../domain/entities/field";
import { ProjectType } from "../../../domain/entities/project-type";
import { ProjectTypeResponse, FieldResponse } from "../schemas/project-type";

export class ProjectTypePresenter {
	static toHTTP(projectType: ProjectType): ProjectTypeResponse {
		return {
			id: projectType.id.toString(),
			name: projectType.name,
			fields: projectType.fields.map((field) => ProjectTypePresenter.mapField(field)),
		};
	}

	private static mapField(field: Field): FieldResponse {
		return {
			id: field.id.toString(),
			name: field.name,
			value: field.value,
			fields: field.fields?.map((f) => ProjectTypePresenter.mapField(f)),
		};
	}
}



import { ProjectType } from "../../../domain/entities/project-type";

export class ProjectTypePresenter {
	static toHTTP(projectType: ProjectType) {
		return {
			id: projectType.id.toString(),
			name: projectType.name,
			createdAt: projectType.createdAt,
			updatedAt: projectType.updatedAt ?? null,
			documents: projectType.documents.map((doc) => ({
				id: doc.id.toString(),
				name: doc.name,
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt ?? null,
				fields: doc.fields.map((field) => ({
					id: field.id.toString(),
					name: field.name,
					value: field.value ?? null,
					createdAt: field.createdAt,
					updatedAt: field.updatedAt ?? null,
				})),
			})),
		};
	}
}

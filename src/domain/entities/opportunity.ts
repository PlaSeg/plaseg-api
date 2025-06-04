import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Document } from "./document";
import { RequiredDocument } from "./required-document";
import { Slug } from "./value-objects/slug";
import { ProjectType } from "./project-type";

export interface OpportunityProps {
	title: string;
	slug: Slug;
	description: string;
	responsibleAgency: string;
	availableValue: number;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage?: number;
	requiredDocuments: RequiredDocument[];
	documents: Document[];
	isActive: boolean;
	releasedForAll?: boolean;
	type: string;
	typeId: string;
	projectTypes: ProjectType[];
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Opportunity extends Entity<OpportunityProps> {
	get title() {
		return this.props.title;
	}

	get slug() {
		return this.props.slug;
	}

	get description() {
		return this.props.description;
	}

	get responsibleAgency() {
		return this.props.responsibleAgency;
	}

	get availableValue() {
		return this.props.availableValue;
	}

	get minValue() {
		return this.props.minValue;
	}

	get maxValue() {
		return this.props.maxValue;
	}

	get initialDeadline() {
		return this.props.initialDeadline;
	}

	get finalDeadline() {
		return this.props.finalDeadline;
	}

	get requiresCounterpart() {
		return this.props.requiresCounterpart;
	}

	get counterpartPercentage() {
		return this.props.counterpartPercentage;
	}

	get isActive() {
		return this.props.isActive;
	}

	get releasedForAll() {
		return this.props.releasedForAll;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get requiredDocuments() {
		return this.props.requiredDocuments;
	}

	get documents() {
		return this.props.documents;
	}

	get typeId() {
		return this.props.typeId;
	}

	get type() {
		return this.props.type;
	}

	get projectTypes() {
		return this.props.projectTypes;
	}

	set requiredDocuments(requiredDocuments: RequiredDocument[]) {
		this.props.requiredDocuments = requiredDocuments;
	}

	addRequiredDocument(requiredDocument: RequiredDocument) {
		this.props.requiredDocuments.push(requiredDocument);
	}

	set projectTypes(projectTypes: ProjectType[]) {
		this.props.projectTypes = projectTypes;
	}

	addProjectType(projectType: ProjectType) {
		this.props.projectTypes.push(projectType);
	}

	removeProjectType(projectTypeId: string) {
		this.props.projectTypes = this.props.projectTypes.filter(
			(pt) => pt.id.toString() !== projectTypeId
		);
	}

	static create(
		props: Optional<
			OpportunityProps,
			| "isActive"
			| "slug"
			| "createdAt"
			| "updatedAt"
			| "releasedForAll"
			| "projectTypes"
		>,
		id?: UniqueEntityID
	) {
		const opportunity = new Opportunity(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				isActive: props.isActive ?? true,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
				releasedForAll: props.releasedForAll ?? false,
				projectTypes: props.projectTypes ?? [],
			},
			id
		);

		return opportunity;
	}
}

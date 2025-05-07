import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface OpportunityProps {
	title: string;
	description: string;
	availableValue: number;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage: number;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Opportunity extends Entity<OpportunityProps> {
	get title() {
		return this.props.title;
	}

	get description() {
		return this.props.description;
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

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<OpportunityProps, "createdAt">,
		id?: UniqueEntityID
	) {
		const opportunity = new Opportunity(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
			},
			id
		);

		return opportunity;
	}
}

import { UniqueEntityID } from "../../../core/entities/unique-entity-id";
import { ValueObject } from "../../../core/entities/value-object";


export interface BaseProductWithMoreInfoProps {
    id: UniqueEntityID;
    code: string;
    name: string;
	technicalDescription: string;
	hasBudgets: boolean;
    budget: number;
    unitValue: number;
    typeId: string;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class BaseProductWithMoreInfo extends ValueObject<BaseProductWithMoreInfoProps> {
	private constructor(props: BaseProductWithMoreInfoProps) {
		super(props);
	}

	get id() {
		return this.props.id;
	}

	get code() {
		return this.props.code;
	}

	get name() {
		return this.props.name;
	}

	get budget() {
		return this.props.budget;
	}

	get hasBudgets() {
		return this.props.hasBudgets;
	}

	get technicalDescription() {
		return this.props.technicalDescription;
	}

	get unitValue() {
		return this.props.unitValue;
	}

	get typeId() {
		return this.props.typeId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(props: BaseProductWithMoreInfoProps) {
		return new BaseProductWithMoreInfo(props);
	}
}

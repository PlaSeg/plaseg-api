import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface MandatoryDocumentProps {
	code: number;
	name: string;
	description: string;
	model: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class MandatoryDocument extends Entity<MandatoryDocumentProps> {
	get code() {
		return this.props.code;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get model() {
		return this.props.model;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<MandatoryDocumentProps, "code" | "createdAt">,
		id?: UniqueEntityID
	) {
		const mandatoryDocument = new MandatoryDocument(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: null,
				code: props.code ?? 0,
			},
			id
		);

		return mandatoryDocument;
	}
}

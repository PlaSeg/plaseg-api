import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { CustomError } from "../../core/errors/custom-error";

export interface PriceRegistrationRecordItemProps {
	priceRegistrationRecordId: string;
	unitValue: number;
	quantity: number;
	minAdherenceQuantity: number;
	maxAdherenceQuantity: number;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class PriceRegistrationRecordItem extends Entity<PriceRegistrationRecordItemProps> {
	get priceRegistrationRecordId() {
		return this.props.priceRegistrationRecordId;
	}

	get quantity() {
		return this.props.quantity;
	}

	get unitValue() {
		return this.props.unitValue;
	}

	get minAdherenceQuantity() {
		return this.props.minAdherenceQuantity;
	}

	get maxAdherenceQuantity() {
		return this.props.maxAdherenceQuantity;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private validateQuantities() {
		if (this.props.minAdherenceQuantity > this.props.maxAdherenceQuantity) {
			throw new CustomError(
				400,
				"Quantidade mínima de adesão não pode ser maior que a quantidade máxima"
			);
		}

		if (
			this.props.quantity < this.props.minAdherenceQuantity ||
			this.props.quantity > this.props.maxAdherenceQuantity
		) {
			throw new CustomError(
				400,
				"Quantidade deve estar entre a quantidade mínima e máxima de adesão"
			);
		}
	}

	static create(
		props: Optional<
			PriceRegistrationRecordItemProps,
			"createdAt" | "updatedAt"
		>,
		id?: UniqueEntityID
	) {
		const priceRegistrationRecordItem = new PriceRegistrationRecordItem(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		priceRegistrationRecordItem.validateQuantities();

		return priceRegistrationRecordItem;
	}
}

import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { PriceRegistrationRecordItem } from "./price-registration-record-item";

export interface PriceRegistrationRecordProps {
	publicAgency: string;
	number: string;
	year: number;
	effectiveDate: Date;
	status: string;
	companyId: string;
	priceRegistrationRecordItems: PriceRegistrationRecordItem[];
	createdAt: Date;
	updatedAt?: Date | null;
}

export class PriceRegistrationRecord extends Entity<PriceRegistrationRecordProps> {
	get publicAgency() {
		return this.props.publicAgency;
	}

	get number() {
		return this.props.number;
	}

	get year() {
		return this.props.year;
	}

	get effectiveDate() {
		return this.props.effectiveDate;
	}

	get status() {
		return this.props.status;
	}

	get companyId() {
		return this.props.companyId;
	}

	get priceRegistrationRecordItems() {
		return this.props.priceRegistrationRecordItems;
	}

	set priceRegistrationRecordItems(items: PriceRegistrationRecordItem[]) {
		this.props.priceRegistrationRecordItems = items;
	}

	addPriceRegistrationRecordItem(item: PriceRegistrationRecordItem) {
		this.props.priceRegistrationRecordItems.push(item);
	}

	static create(
		props: Optional<
			PriceRegistrationRecordProps,
			"priceRegistrationRecordItems" | "createdAt" | "updatedAt"
		>,
		id?: UniqueEntityID
	) {
		const priceRegistrationRecord = new PriceRegistrationRecord(
			{
				...props,
				priceRegistrationRecordItems: props.priceRegistrationRecordItems ?? [],
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return priceRegistrationRecord;
	}
}

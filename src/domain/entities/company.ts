import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";
import { Email } from "./value-objects/email";

export interface CompanyProps {
	userId: string;
	cnpj: string;
	legalName: string;
	tradeName: string;
	address: string;
	email: Email;
	phone: string;
	site: string;
	portfolioDescription: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class Company extends Entity<CompanyProps> {
	get userId() {
		return this.props.userId;
	}

	get cnpj() {
		return this.props.cnpj;
	}

	get legalName() {
		return this.props.legalName;
	}

	get tradeName() {
		return this.props.tradeName;
	}

	get address() {
		return this.props.address;
	}

	get email() {
		return this.props.email;
	}

	get phone() {
		return this.props.phone;
	}

	get site() {
		return this.props.site;
	}

	get portfolioDescription() {
		return this.props.portfolioDescription;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<CompanyProps, "createdAt" | "updatedAt">,
		id?: UniqueEntityID
	) {
		const company = new Company(
			{
				...props,
				createdAt: props.createdAt ?? getCurrentDate(),
				updatedAt: props.updatedAt ?? null,
			},
			id
		);

		return company;
	}
}

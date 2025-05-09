import { QualifiedStaffsRepository } from "../../src/domain/repositories/qualified-staffs-repository";
import { QualifiedStaff } from "../../src/domain/entities/qualified-staff";

export class InMemoryQualifiedStaffsRepository
	implements QualifiedStaffsRepository
{
	public items: QualifiedStaff[] = [];

	async findById(id: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find(
			(staff) => staff.id.toString() === id
		);

		if (!qualifiedStaff) {
			return null;
		}

		return qualifiedStaff;
	}

	async findByName(name: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find((staff) => staff.name === name);

		if (!qualifiedStaff) {
			return null;
		}

		return qualifiedStaff;
	}

	async findByDocument(document: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find(
			(staff) => staff.document === document
		);

		if (!qualifiedStaff) {
			return null;
		}

		return qualifiedStaff;
	}

	async findByMunicipalityId(
		municipalityId: string
	): Promise<QualifiedStaff[] | null> {
		const qualifiedStaffs = this.items.filter(
			(staff) => staff.municipalityId === municipalityId
		);

		if (!qualifiedStaffs.length) {
			return null;
		}

		return qualifiedStaffs;
	}

	async create(qualifiedStaff: QualifiedStaff): Promise<void> {
		this.items.push(qualifiedStaff);
	}
}

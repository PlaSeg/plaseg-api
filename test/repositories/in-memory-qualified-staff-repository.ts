import { QualifiedStaff } from "../../src/domain/entities/qualified-staff";
import { QualifiedStaffRepository } from "../../src/domain/repositories/qualified-staff-repository";

export class InMemoryQualifiedStaffRepository
	implements QualifiedStaffRepository
{
	public items: QualifiedStaff[] = [];

	async create(qualifiedStaff: QualifiedStaff): Promise<void> {
		this.items.push(qualifiedStaff);
	}

	async findById(id: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find((item) => item.id.toString() === id);

		if (!qualifiedStaff) {
			return null;
		}

		return qualifiedStaff;
	}

	async findByName(name: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find((item) => item.name === name);

		if (!qualifiedStaff) {
			return null;
		}

		return qualifiedStaff;
	}

	async findByDocument(document: string): Promise<QualifiedStaff | null> {
		const qualifiedStaff = this.items.find(
			(item) => item.document === document
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
			(item) => item.municipalityId.toString() === municipalityId
		);

		if (!qualifiedStaffs.length) {
			return null;
		}

		return qualifiedStaffs;
	}
}

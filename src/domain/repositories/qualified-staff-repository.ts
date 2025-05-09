import { QualifiedStaff } from "../entities/qualified-staff";

export interface QualifiedStaffRepository {
	create(qualifiedStaff: QualifiedStaff): Promise<void>;
	findById(id: string): Promise<QualifiedStaff | null>;
	findByName(name: string): Promise<QualifiedStaff | null>;
	findByDocument(document: string): Promise<QualifiedStaff | null>;
	findByMunicipalityId(
		municipalityId: string
	): Promise<QualifiedStaff[] | null>;
}

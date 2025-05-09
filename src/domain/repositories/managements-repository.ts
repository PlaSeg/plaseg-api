import { Management } from "../entities/management";

export interface ManagementsRepository {
	findById(id: string): Promise<Management | null>;
	findByMunicipalityId(municipalityId: string): Promise<Management[] | null>;
	create(management: Management): Promise<void>;
}

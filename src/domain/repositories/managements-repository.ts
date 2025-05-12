import { Management } from "../entities/management";

export interface ManagementsRepository {
	create(management: Management): Promise<void>;
	findById(id: string): Promise<Management | null>;
	findByMunicipalityId(municipalityId: string): Promise<Management[] | null>;
}

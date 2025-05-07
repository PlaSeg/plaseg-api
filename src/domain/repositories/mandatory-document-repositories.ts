import { MandatoryDocument } from "../entities/mandatory-document";

export interface MandatoriesDocumentsRepository {
	findMany(): Promise<MandatoryDocument[] | null>;
	findById(id: string): Promise<MandatoryDocument | null>;
	findByName(name: string): Promise<MandatoryDocument | null>;
	create(mandatoryDocument: MandatoryDocument): Promise<void>;
	update(mandatoryDocument: MandatoryDocument): Promise<void>;
}

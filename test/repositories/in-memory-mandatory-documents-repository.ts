import { MandatoryDocument } from "../../src/domain/entities/mandatory-document";
import { MandatoriesDocumentsRepository } from "../../src/domain/repositories/mandatory-document-repositories";

export class InMemoryMandatoriesDocumentsRepository
	implements MandatoriesDocumentsRepository
{
	public items: MandatoryDocument[] = [];

	async findByName(name: string): Promise<MandatoryDocument | null> {
		const mandatoryDocument = this.items.find(
			(document) => document.name.toLowerCase() === name.toLowerCase()
		);

		if (!mandatoryDocument) {
			return null;
		}
		return mandatoryDocument;
	}

	async findMany(): Promise<MandatoryDocument[] | null> {
		if (this.items.length === 0) {
			return null;
		}
		return this.items;
	}

	async findById(id: string): Promise<MandatoryDocument | null> {
		const mandatoryDocument = this.items.find(
			(document) => document.id.toString() === id
		);

		if (!mandatoryDocument) {
			return null;
		}
		return mandatoryDocument;
	}

	async create(mandatoryDocument: MandatoryDocument): Promise<void> {
		this.items.push(mandatoryDocument);
	}

	async update(mandatoryDocument: MandatoryDocument): Promise<void> {
		const documentIndex = this.items.findIndex(
			(doc) => doc.id.toString() === mandatoryDocument.id.toString()
		);

		if (documentIndex !== -1) {
			this.items[documentIndex] = mandatoryDocument;
		}
	}
}

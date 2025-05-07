import { CustomError } from "../../core/errors/custom-error";
import { Either, left, right } from "../../core/types/either";
import { MandatoryDocument } from "../entities/mandatory-document";
import { MandatoriesDocumentsRepository } from "../repositories/mandatory-document-repositories";

type CreateMandatoryDocumentRequest = {
	name: string;
	description: string;
	model: string;
};

type CreateMandatoryDocumentUseCaseResponse = Either<
	CustomError,
	{
		mandatoryDocument: CreateMandatoryDocumentRequest;
	}
>;

export class CreateMandatoryDocumentUseCase {
	constructor(
		private mandatoryDocumentRepository: MandatoriesDocumentsRepository
	) {}

	async execute(
		request: CreateMandatoryDocumentRequest
	): Promise<CreateMandatoryDocumentUseCaseResponse> {
		const doesMandatoryDocumentAlreadyExist =
			await this.mandatoryDocumentRepository.findByName(request.name);

		if (doesMandatoryDocumentAlreadyExist) {
			return left(new CustomError(409, "Nome já cadastrado"));
		}

		const mandatoryDocument = MandatoryDocument.create({
			...request,
		});

		await this.mandatoryDocumentRepository.create(mandatoryDocument);

		return right({
			mandatoryDocument,
		});
	}
}

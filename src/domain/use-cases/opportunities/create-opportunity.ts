import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Opportunity } from "../../entities/opportunity";
import { OpportunitiesRepository } from "../../repositories/opportunities-repository";
import { RequiredDocument } from "../../entities/required-document";
import { TypesRepository } from "../../repositories/types-repository";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { Document } from "../../entities/document";
import { buildFieldTree } from "../../helpers/field-helper";

type FieldRequest = {
	id: string;
	name: string;
	value?: string;
	parentId?: string;
};

type DocumentRequest = {
	name: string;
	fields: FieldRequest[];
}

type RequiredDocumentRequest = {
	name: string;
	description: string;
	model: string;
};

type CreateOpportunityUseCaseRequest = {
	title: string;
	description: string;
	availableValue: number;
	responsibleAgency: string;
	minValue: number;
	maxValue: number;
	initialDeadline: Date;
	finalDeadline: Date;
	requiresCounterpart: boolean;
	counterpartPercentage?: number;
	releasedForAll?: boolean;
	type: string;
	typeId: string;
	requiredDocuments: RequiredDocumentRequest[];
	documents: DocumentRequest[];
};

type CreateOpportunityUseCaseResponse = Either<
	CustomError,
	{
		opportunity: Opportunity;
	}
>;

export class CreateOpportunityUseCase {
	constructor(
		private opportunityRepository: OpportunitiesRepository,
		private typesRepository: TypesRepository
	) {}

	async execute(
		request: CreateOpportunityUseCaseRequest
	): Promise<CreateOpportunityUseCaseResponse> {
		const doesOpportunityAlreadyExist =
			await this.opportunityRepository.findByTitle(request.title);

		if (doesOpportunityAlreadyExist) {
			return left(new CustomError(409, "Título já cadastrado"));
		}

		const type = await this.typesRepository.findById(request.typeId);

		if (!type) {
			return left(new CustomError(404, "Tipo não encontrado"));
		}

		if (type.group.getValue() !== TypeGroup.opportunity().getValue()) {
			return left(
				new CustomError(400, "O tipo selecionado não é uma oportunidade")
			);
		}

		const requiredDocuments = request.requiredDocuments.map((document) =>
			RequiredDocument.create({
				name: document.name,
				description: document.description,
				model: document.model,
			})
		);

		const documents = request.documents.map((doc) => 
			Document.create({
				name: doc.name,
				fields: buildFieldTree(doc.fields)
			})
		)

		const opportunity = Opportunity.create({
			...request,
			requiredDocuments,
			documents
		});

		await this.opportunityRepository.create(opportunity);

		return right({
			opportunity,
		});
	}
}

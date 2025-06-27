import { CustomError } from "../../../core/errors/custom-error";
import { Either, left, right } from "../../../core/types/either";
import { Opportunity } from "../../entities/opportunity";
import { OpportunitiesRepository } from "../../repositories/opportunities-repository";
import { RequiredDocument } from "../../entities/required-document";
import { TypesRepository } from "../../repositories/types-repository";
import { TypeGroup } from "../../entities/value-objects/type-group";
import { Document } from "../../entities/document";
import { buildFieldTree } from "../../helpers/field-helper";
import { ProjectTypesRepository } from "../../repositories/project-type-repository";
import { BaseProductsRepository } from "../../repositories/base-products-repository";

type FieldRequest = {
	id: string;
	name: string;
	value?: string;
	parentId?: string;
};

type DocumentRequest = {
	name: string;
	fields: FieldRequest[];
};

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
	typeId: string;
	projectTypeIds: string[];
	baseProductIds: string[];
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
		private typesRepository: TypesRepository,
		private projectTypesRepository: ProjectTypesRepository,
		private baseProductsRepository: BaseProductsRepository
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

		for (const projectTypeId of request.projectTypeIds) {
			const projectType = await this.projectTypesRepository.findById(
				projectTypeId
			);
			if (!projectType) {
				return left(
					new CustomError(
						404,
						`Tipo de projeto ${projectTypeId} não encontrado`
					)
				);
			}
		}

		let allBaseProducts = false;

		if (!request.baseProductIds || request.baseProductIds.length === 0) {
			allBaseProducts = true;
		}

		if (!allBaseProducts) {
			for (const baseProductId of request.baseProductIds) {
				const baseProduct = await this.baseProductsRepository.findById(
					baseProductId
				);

				if (!baseProduct) {
					return left(
						new CustomError(404, `Produto base ${baseProductId} não encontrado`)
					);
				}
			}
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
				fields: buildFieldTree(doc.fields),
			})
		);

		const opportunity = Opportunity.create({
			...request,
			requiredDocuments,
			documents,
			allBaseProducts,
			typeId: type.id.toString(),
			type: type.description,
		});

		await this.opportunityRepository.create(opportunity);

		for (const projectTypeId of request.projectTypeIds) {
			await this.projectTypesRepository.createOpportunityProjectType(
				opportunity.id.toString(),
				projectTypeId
			);
		}

		if (!allBaseProducts) {
			for (const baseProductId of request.baseProductIds) {
				await this.baseProductsRepository.createOpportunityBaseProduct(
					opportunity.id.toString(),
					baseProductId
				);
			}	
		}

		return right({
			opportunity,
		});
	}
}

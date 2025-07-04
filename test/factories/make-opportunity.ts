import { getCurrentDate } from "../../src/core/utils/get-current-date";
import {
	Opportunity,
	OpportunityProps,
} from "../../src/domain/entities/opportunity";
import { makeRequiredDocument } from "./make-required-document";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeOpportunity(override: Partial<OpportunityProps> = {}) {
	const opportunity = Opportunity.create({
		title: "Opportunity Title",
		description: "Opportunity Description",
		availableValue: 1000,
		minValue: 100,
		maxValue: 5000,
		initialDeadline: getCurrentDate("2025-05-05T00:00:00.000Z"),
		finalDeadline: getCurrentDate(),
		requiresCounterpart: true,
		counterpartPercentage: 10,
		requiredDocuments: [makeRequiredDocument()],
		typeId: new UniqueEntityID().toString(),
		...override,
	});

	return opportunity;
}

import {
	Opportunity,
	OpportunityProps,
} from "../../src/domain/entities/opportunity";
import { makeRequiredDocument } from "./make-required-document";

export function makeOpportunity(override: Partial<OpportunityProps> = {}) {
	const opportunity = Opportunity.create({
		title: "Opportunity Title",
		description: "Opportunity Description",
		availableValue: 1000,
		minValue: 100,
		maxValue: 5000,
		initialDeadline: new Date(),
		finalDeadline: new Date(),
		requiresCounterpart: true,
		counterpartPercentage: 10,
		requiredDocuments: [makeRequiredDocument()],
		...override,
	});

	return opportunity;
}

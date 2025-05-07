import { Opportunity } from "../../src/domain/entities/opportunity";

export class InMemoryOpportunitiesRepository {
	public items: Opportunity[] = [];
}

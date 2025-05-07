import { Opportunity } from "../entities/opportunity";

export interface OportunitiesRepository {
	findMany(): Promise<Opportunity[] | null>;
	findByTitle(title: string): Promise<Opportunity | null>;
	findById(id: string): Promise<Opportunity | null>;
	create(opportunity: Opportunity): Promise<void>;
	update(opportunity: Opportunity): Promise<void>;
}

import { Opportunity } from "../entities/opportunity";

export interface OpportunitiesRepository {
	findById(id: string): Promise<Opportunity | null>;
	findMany(): Promise<Opportunity[] | null>;
	findByTitle(title: string): Promise<Opportunity | null>;
	create(opportunity: Opportunity): Promise<void>;
	update(opportunity: Opportunity): Promise<void>;
}

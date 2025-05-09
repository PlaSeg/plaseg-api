import {
	Municipality,
	MunicipalityProps,
} from "../../src/domain/entities/municipality";
import { UnitType } from "../../src/domain/entities/value-objects/unit-type";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

export function makeMunicipality(override: Partial<MunicipalityProps> = {}) {
	const municipality = Municipality.create({
		name: "São Paulo",
		guardInitialDate: new Date(),
		guardCount: 10,
		trafficInitialDate: new Date(),
		trafficCount: 5,
		federativeUnit: "SP",
		unitType: UnitType.create("MUNICIPALITY"),
		userId: new UniqueEntityID().toString(),
		...override,
	});

	return municipality;
}

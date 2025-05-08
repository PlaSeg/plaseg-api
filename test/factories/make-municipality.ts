import {
    Municipality,
    MunicipalityProps,
} from "../../src/domain/entities/municipality";
import { UnitType } from "../../src/domain/entities/value-objects/unit-type";

export function makeMunicipality(override: Partial<MunicipalityProps> = {}) {
    const municipality = Municipality.create({
        name: "Município Exemplo",
        guardInitialDate: new Date("2023-01-01"),
        guardCount: 10,
        trafficInitialDate: new Date("2023-06-01"),
        trafficCount: 5,
        federativeUnit: "PI",
        unitType: UnitType.create("ESTADUAL"),
        userId: "user-01",
        ...override,
    });

    return municipality;
}

import { Prisma, Municipality as PrismaMunicipality } from "@prisma/client";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Municipality } from "../../../../domain/entities/municipality";
import { UnitType } from "../../../../domain/entities/value-objects/unit-type";

export class PrismaMunicipalityMapper {
    static toDomain(raw: PrismaMunicipality): Municipality {
        return Municipality.create(
            {
                name: raw.name,
                guardInitialDate: raw.guardInitialDate,
                guardCount: raw.guardCount,
                trafficInitialDate: raw.trafficInitialDate,
                trafficCount: raw.trafficCount,
                federativeUnit: raw.federativeUnit,
                unitType: UnitType.create(raw.unitType),
                userId: raw.userId,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            new UniqueEntityID(raw.id)
        );
    }

    static toPrisma(municipality: Municipality): Prisma.MunicipalityUncheckedCreateInput {
        return {
            id: municipality.id.toString(),
            name: municipality.name,
            guardInitialDate: municipality.guardInitialDate,
            guardCount: municipality.guardCount,
            trafficInitialDate: municipality.trafficInitialDate,
            trafficCount: municipality.trafficCount,
            federativeUnit: municipality.federativeUnit,
            unitType: municipality.unitType.toPrisma(),
            userId: municipality.userId,
            createdAt: municipality.createdAt,
            updatedAt: municipality.updatedAt,
        };
    }
}

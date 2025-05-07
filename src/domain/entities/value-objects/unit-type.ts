import { UnitType as PrismaUnitType } from "@prisma/client";

export enum DomainUnitType {
    UF = "UF",
    MUNICIPALITY = "MUNICIPALITY"
}

export class UnitType {
    private readonly value: DomainUnitType;

    private constructor(unitType: DomainUnitType) {
        this.value = unitType;
    }

    public getValue(): DomainUnitType {
        return this.value;
    }

    public toPrisma(): PrismaUnitType {
        switch (this.value) {
            case DomainUnitType.UF:
                return PrismaUnitType.UF;
            case DomainUnitType.MUNICIPALITY:
                return PrismaUnitType.MUNICIPALITY;
            default:
                throw new Error(`Invalid unit type: ${this.value}`);
        }
    }

    public static uf(): UnitType {
        return new UnitType(DomainUnitType.UF);
    }

    public static municipality(): UnitType {
        return new UnitType(DomainUnitType.MUNICIPALITY);
    }

    public toString(): string {
        return this.value;
    }
}

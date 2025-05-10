import { TypeGroup as PrismaTypeGroup } from "@prisma/client";

export enum DomainTypeGroup {
    SERVICE = "SERVICE",
    CATEGORY = "CATEGORY",
    SUBCATEGORY = "SUBCATEGORY",
    SUBSUBCATEGORY = "SUBSUBCATEGORY",
    OPPORTUNITY = "OPPORTUNITY"
}

export class TypeGroup {
	private readonly value: DomainTypeGroup;

	private constructor(typeGroup: DomainTypeGroup) {
		this.value = typeGroup;
	}

	public getValue(): DomainTypeGroup {
		return this.value;
	}

	public toPrisma(): PrismaTypeGroup {
		switch (this.value) {
			case DomainTypeGroup.SERVICE:
				return PrismaTypeGroup.SERVICE;
			case DomainTypeGroup.CATEGORY:
				return PrismaTypeGroup.CATEGORY;
			case DomainTypeGroup.SUBCATEGORY:
				return PrismaTypeGroup.SUBCATEGORY;
			case DomainTypeGroup.SUBSUBCATEGORY:
				return PrismaTypeGroup.SUBSUBCATEGORY;
			case DomainTypeGroup.OPPORTUNITY:
				return PrismaTypeGroup.OPPORTUNITY;
			default:
				throw new Error(`Invalid type group: ${this.value}`);
		}
	}

	static create(value: string): TypeGroup {
		if (
			value === DomainTypeGroup.SERVICE ||
			value === DomainTypeGroup.CATEGORY ||
			value === DomainTypeGroup.SUBCATEGORY ||
			value === DomainTypeGroup.SUBSUBCATEGORY ||
			value === DomainTypeGroup.OPPORTUNITY
		) {
			return new TypeGroup(value);
		}

		throw new Error("Invalid type group.");
	}

	public static service(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.SERVICE);
	}

	public static category(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.CATEGORY);
	}

	public static subcategory(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.SUBCATEGORY);
	}

	public static subsubcategory(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.SUBSUBCATEGORY);
	}

	public static opportunity(): TypeGroup {
		return new TypeGroup(DomainTypeGroup.OPPORTUNITY);
	}

	public toString(): string {
		return this.value;
	}
}

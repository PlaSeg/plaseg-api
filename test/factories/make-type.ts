import { Type, TypeProps } from "../../src/domain/entities/type";
import { TypeGroup } from "../../src/domain/entities/value-objects/type-group";

export function makeType(override: Partial<TypeProps> = {}) {
	const type = Type.create({
		description: "Test Type",
		group: TypeGroup.opportunity(),
		...override,
	});

	return type;
}

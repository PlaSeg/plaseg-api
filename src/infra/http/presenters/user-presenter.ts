import { User } from "../../../domain/entities/user";
import { MunicipalityUserResponse } from "../schemas/municipality";

export class UserPresenter {
	static toHTTP(user: User): MunicipalityUserResponse {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email.toString(),
			phone: user.phone,
			document: user.document,
			role: user.role.toString(),
			allowed: user.allowed,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt ?? null,
		};
	}
}

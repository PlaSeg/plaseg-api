import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import { getCurrentDate } from "../../core/utils/get-current-date";

export interface AllocationDepartmentProps {
    description: string;
    address: string;
    municipalityId: string;
    createdAt: Date;
    updatedAt?: Date | null;
}

export class AllocationDepartment extends Entity<AllocationDepartmentProps> {
    get description() {
        return this.props.description;
    }

    get address() {
        return this.props.address;
    }

    get municipalityId() {
        return this.props.municipalityId;
    }

    static create(
        props: Optional<AllocationDepartmentProps, "createdAt">,
        id?: UniqueEntityID
    ) {
        const allocationDepartment = new AllocationDepartment(
            {
                ...props,
                createdAt: props.createdAt ?? getCurrentDate(),
                updatedAt: null
            },
            id
        );

        return allocationDepartment;
    }
}

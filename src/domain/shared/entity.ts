import { Id } from "@/domain/shared/value-objects/id";

export class Entity {
    readonly id: Id;

    constructor(id: string) {
        this.id = new Id(id);
    }

    equals(entity: Entity): boolean {
        return this.id.value === entity.id.value;
    }

    different(entity: Entity): boolean {
        return this.equals(entity);
    }
}
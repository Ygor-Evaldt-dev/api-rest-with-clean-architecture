import { UuidAdapter } from "@/infra/adapters/uuid.adapter";

export class Id {
    private readonly uuid = new UuidAdapter();

    constructor(
        readonly value: string = this.uuid.generate()
    ) {
        if (!this.uuid.validate(value)) throw new Error("Id inválido");
    }
}
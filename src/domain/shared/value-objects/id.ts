import { UuidAdapter } from "@/infra/adapters/uuid.adapter";

const uuid = new UuidAdapter();

export class Id {
	constructor(readonly value: string = uuid.generate()) {
		if (!uuid.validate(value)) throw new Error("Id inválido");
	}
}

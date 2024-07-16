import { v4 as uuidv4, validate } from "uuid";

import { IUuid } from "@/domain/ports/uuid.interface";

export class UuidAdapter implements IUuid {
	generate(): string {
		return uuidv4();
	}

	validate(id: string): boolean {
		return validate(id);
	}
}

import { BadRequestException } from "@/common/exceptions";
import { UuidAdapter } from "@/infra/adapters/uuid.adapter";

export function validateUuid(id: string, entityName: string): void {
    const uuid = new UuidAdapter();
    if (!uuid.validate(id))
        throw new BadRequestException(`Idêntificação de ${entityName} inválida`);
}
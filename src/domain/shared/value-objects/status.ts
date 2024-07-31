import { BadRequestException } from "@/common/exceptions";
import { StatusEnum } from "../enums/status.enum";

export class Status {
    constructor(
        readonly value: StatusEnum
    ) {
        if (!Object.values(StatusEnum).includes(value))
            throw new BadRequestException("O status deve ser: 'pendente', 'concluído', ou 'em andamento'.");
    }
}
import { BadRequestException } from "@/common/exceptions";
import { StatusEnum } from "../enums/status.enum";

export class Status {
    constructor(
        readonly value: StatusEnum
    ) {
        if (!Object.values(StatusEnum).includes(value))
            throw new BadRequestException("Status deve ser um dos seguintes: pendente, concluído, em andamento");
    }
}
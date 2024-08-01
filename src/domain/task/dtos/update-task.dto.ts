import { StatusEnum } from "@/domain/shared/enums/status.enum";

export class UpdateTaskDto {
    constructor(
        readonly id: string,
        readonly title?: string,
        readonly description?: string,
        readonly status?: StatusEnum
    ) { }
}
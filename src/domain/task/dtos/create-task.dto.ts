import { StatusEnum } from "@/domain/shared/enums/status.enum";

export class CreateTaskDto {
    constructor(
        readonly title: string,
        readonly userId: string,
        readonly status?: StatusEnum,
        readonly description?: string
    ) { }
}
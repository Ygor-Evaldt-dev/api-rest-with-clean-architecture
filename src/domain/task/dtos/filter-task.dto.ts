import { StatusEnum } from "@/domain/shared/enums/status.enum";

export class FilterTaskDto {
    constructor(
        readonly title?: string,
        readonly status?: StatusEnum
    ) { }
}
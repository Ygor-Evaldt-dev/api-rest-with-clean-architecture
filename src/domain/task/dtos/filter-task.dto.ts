import { StatusEnum } from "@/domain/shared/enums/status.enum";

export class FilterTaskDto {
    constructor(
        readonly page: number,
        readonly take: number,
        readonly userId: string,
        readonly title?: string,
        readonly status?: StatusEnum
    ) { }
}
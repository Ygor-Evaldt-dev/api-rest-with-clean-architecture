import { StatusEnum } from "@/domain/shared/enums/status.enum";

export type TaskFilter = {
    userId?: string
    title?: string,
    status?: StatusEnum
}
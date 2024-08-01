import { StatusEnum } from "@/domain/shared/enums/status.enum";

export type TaskFilterParam = {
    page: number;
    take: number;
    title?: string;
    status?: StatusEnum;
}
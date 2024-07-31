import { StatusEnum } from "@/domain/shared/enums/status.enum";

export type TaskParams = {
    id?: string;
    title: string;
    description?: string;
    status?: StatusEnum;
}
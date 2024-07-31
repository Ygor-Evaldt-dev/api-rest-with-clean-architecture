import { Status } from "@/domain/shared/enums/status";

export type TaskParams = {
    id?: string;
    title: string;
    description?: string;
    status?: Status;
}
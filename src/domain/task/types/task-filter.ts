import { Status } from "@/domain/shared/value-objects";

export type TaskFilter = {
    page: number;
    take: number;
    title?: string;
    status?: Status;
}
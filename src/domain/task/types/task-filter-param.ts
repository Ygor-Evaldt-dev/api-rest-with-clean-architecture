import { Status } from "@/domain/shared/value-objects";

export type TaskFilterParam = {
    page: number;
    take: number;
    title?: string;
    status?: Status;
}
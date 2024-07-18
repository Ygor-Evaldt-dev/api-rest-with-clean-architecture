import { Status } from "@/domain/shared/enums/status";

export type Params = {
    id?: string;
    title: string;
    description?: string;
    status?: Status;
}
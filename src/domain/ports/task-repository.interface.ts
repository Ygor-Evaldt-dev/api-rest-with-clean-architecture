import { PaginationInput } from "../shared/types";
import { Task } from "@/domain/task/entity/task.entity";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findMany(params: PaginationInput): Promise<Task[]>;
    total(): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
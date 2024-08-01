import { PaginationInput } from "../shared/types";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskFilter } from "../task/types/task-filter";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(params: PaginationInput): Promise<Task[]>;
    filter(params: TaskFilter): Promise<Task[]>;
    total(): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
import { PaginationInput } from "../shared/types";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskFilterParam } from "../task/types/task-filter-param";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(params: PaginationInput): Promise<Task[]>;
    filter(params: TaskFilterParam): Promise<Task[]>;
    total(params?: TaskFilterParam): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
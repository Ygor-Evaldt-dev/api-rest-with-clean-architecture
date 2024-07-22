import { Task } from "../task/entity/task.entity";
import { Input } from "@/domain/task/use-cases/findMany.usecase";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findMany(params: Input): Promise<Task[] | []>;
    total(): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
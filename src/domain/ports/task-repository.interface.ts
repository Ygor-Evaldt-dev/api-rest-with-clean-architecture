import { Task } from "../task/entity/task.entity";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
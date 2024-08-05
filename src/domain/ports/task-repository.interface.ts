import { Task } from "@/domain/task/entity/task.entity";
import { FindManyTaskDto } from "../task/dtos";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(params: FindManyTaskDto): Promise<Task[]>;
    total(params?: FindManyTaskDto): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
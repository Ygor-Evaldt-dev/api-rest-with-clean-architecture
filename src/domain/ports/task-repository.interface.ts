import { Task } from "@/domain/task/entity/task.entity";
import { FilterTaskDto, FindManyDto } from "../task/dtos";

export interface ITaskRepository {
    create(userId: string, task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(params: FindManyDto): Promise<Task[]>;
    filter(params: FilterTaskDto): Promise<Task[]>;
    total(params?: FilterTaskDto): Promise<number>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}
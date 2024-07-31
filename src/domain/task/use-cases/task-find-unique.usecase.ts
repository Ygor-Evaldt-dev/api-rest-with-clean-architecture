import { ITaskRepository } from "@/domain/ports";
import { IService } from "@/domain/shared/service.interface";
import { Task } from "@/domain/task/entity/task.entity";

export class TaskFindUniqueUseCase implements IService<string, Task | null> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<Task | null> {
        return await this.repository.findUnique(id);
    }
}
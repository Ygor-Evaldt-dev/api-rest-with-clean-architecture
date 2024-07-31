import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";

export class TaskFindUniqueUseCase implements IUseCase<string, Task | null> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<Task | null> {
        return await this.repository.findUnique(id);
    }
}
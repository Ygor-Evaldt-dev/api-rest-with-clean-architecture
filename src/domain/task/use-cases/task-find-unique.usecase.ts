import { NotFoundException } from "@/common/exceptions";
import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";

export class TaskFindUnique implements IUseCase<string, Task> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<Task> {
        const task = await this.repository.findUnique(id);
        if (task === null)
            throw new NotFoundException("Tarefa não cadastrada");

        return task;
    }
}
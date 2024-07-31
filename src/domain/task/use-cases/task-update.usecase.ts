import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";

export class TaskUpdateUseCase implements IUseCase<Task, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(task: Task): Promise<void> {
        await this.repository.update(task);
    }

}

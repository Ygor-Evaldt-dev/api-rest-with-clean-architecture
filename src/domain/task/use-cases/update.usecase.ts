import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IService } from "@/domain/shared/service.interface";
import { Task } from "@/domain/task/entity/task.entity";

export class UpdateUseCase implements IService<Task, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(task: Task): Promise<void> {
        await this.repository.update(task);
    }

}

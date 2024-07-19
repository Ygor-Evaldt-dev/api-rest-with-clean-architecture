import { IService } from "@/domain/shared/service.interface";
import { Task } from "../entity/task.entity";
import { ITaskRepository } from "@/domain/ports/task-repository.interface";

type Input = {
    userId: string;
    task: Task
}

export class CreateUseCase implements IService<Input, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        userId,
        task
    }: Input): Promise<void> {
        await this.repository.create(userId, task);
    }

}
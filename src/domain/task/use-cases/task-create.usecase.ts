import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "../entity/task.entity";
import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { CreateTaskDto } from "../dtos";

type Input = {
    userId: string;
    task: Task
}

export class TaskCreate implements IUseCase<CreateTaskDto, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        title,
        description,
        status,
        userId
    }: CreateTaskDto): Promise<void> {
        const task = new Task({
            title,
            description,
            status
        });
        await this.repository.create(userId, task);
    }

}
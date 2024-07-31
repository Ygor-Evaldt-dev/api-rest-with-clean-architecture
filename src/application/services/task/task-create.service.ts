import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { CreateTaskDto } from "./dtos";
import { TaskCreateUseCase } from "@/domain/task/use-cases";
import { Status } from "@/domain/shared/enums/status";

export class TaskCreateService implements IUseCase<CreateTaskDto, Task> {
    constructor(
        private readonly create: TaskCreateUseCase
    ) { }

    async execute({
        title,
        description,
        status,
        userId
    }: CreateTaskDto): Promise<Task> {
        const task = new Task({
            title,
            description,
            status: status as Status
        });
        await this.create.execute({ userId, task });

        return task;
    }
}
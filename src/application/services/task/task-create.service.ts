import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { CreateTaskDto } from "../../../domain/task/dtos";
import { TaskCreate } from "@/domain/task/use-cases";
import { StatusEnum } from "@/domain/shared/enums/status.enum";

export class TaskCreateService implements IUseCase<CreateTaskDto, Task> {
    constructor(
        private readonly create: TaskCreate
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
            status: status as StatusEnum
        });
        await this.create.execute({ userId, task });

        return task;
    }
}
import { IService } from "@/domain/shared/service.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { CreateTaskDto } from "./dtos";
import { CreateUseCase } from "@/domain/task/use-cases";
import { Status } from "@/domain/shared/enums/status";

export class CreateService implements IService<CreateTaskDto, Task> {
    constructor(
        private readonly create: CreateUseCase
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
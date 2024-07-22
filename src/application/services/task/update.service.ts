import { IService } from "@/domain/shared/service.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { UpdateTaskDto } from "./dtos";
import { FindUniqueUseCase, UpdateUseCase } from "@/domain/task/use-cases";
import { Status } from "@/domain/shared/enums/status";
import { NotFoundException } from "@/common/exceptions";

export class UpdateService implements IService<UpdateTaskDto, Task> {
    constructor(
        private readonly findUnique: FindUniqueUseCase,
        private readonly update: UpdateUseCase
    ) { }

    async execute({
        id,
        title,
        description,
        status
    }: UpdateTaskDto): Promise<Task> {
        const existingTask = await this.findUnique.execute(id);
        if (existingTask === null)
            throw new NotFoundException("Taréfa não cadastrada");

        const task = new Task({
            id,
            title: title ?? existingTask.title.complete,
            description: description ?? existingTask.description?.complete,
            status: status as Status ?? existingTask.status
        });
        await this.update.execute(task);

        return task;
    }
}
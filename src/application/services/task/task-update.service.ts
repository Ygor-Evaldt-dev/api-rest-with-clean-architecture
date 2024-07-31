import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { UpdateTaskDto } from "./dtos";
import { TaskFindUniqueUseCase, TaskUpdateUseCase } from "@/domain/task/use-cases";
import { Status } from "@/domain/shared/enums/status";
import { NotFoundException } from "@/common/exceptions";

export class TaskUpdateService implements IUseCase<UpdateTaskDto, Task> {
    constructor(
        private readonly findUnique: TaskFindUniqueUseCase,
        private readonly update: TaskUpdateUseCase
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
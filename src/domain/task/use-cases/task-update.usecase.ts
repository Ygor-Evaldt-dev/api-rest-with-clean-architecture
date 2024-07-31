import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { UpdateTaskDto } from "../dtos";
import { NotFoundException } from "@/common/exceptions";

export class TaskUpdate implements IUseCase<UpdateTaskDto, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        id,
        title,
        description,
        status
    }: UpdateTaskDto): Promise<void> {
        const existingTask = await this.repository.findUnique(id);
        if (existingTask === null)
            throw new NotFoundException("Taréfa não cadastrada");

        const task = new Task({
            id,
            title: title ?? existingTask.title.complete,
            description,
            status
        });

        await this.repository.update(task);
    }

}

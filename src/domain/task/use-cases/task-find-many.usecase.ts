import { ITaskRepository } from "@/domain/ports";
import { IService } from "@/domain/shared/service.interface";
import { PaginationInput } from "@/domain/shared/types";
import { Task } from "@/domain/task/entity/task.entity";

export class TaskFindManyUseCase implements IService<PaginationInput, Task[]> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        page,
        take
    }: PaginationInput): Promise<Task[]> {
        const registers = await this.repository.findMany({ page, take });
        return registers;
    }
}
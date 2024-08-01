import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskFilterParam } from "../types/task-filter-param";
import { NotFoundException } from "@/common/exceptions";
import { PaginationOutput } from "@/domain/shared/types";

export class TaskFilter implements IUseCase<TaskFilterParam, PaginationOutput<Task>> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(params: TaskFilterParam): Promise<PaginationOutput<Task>> {
        const [registers, total] = await Promise.all([
            this.repository.filter(params),
            this.repository.total(params)
        ]);

        if (registers.length <= 0)
            throw new NotFoundException("Nenhuma tarefa encontrada");

        const { page, take } = params;
        return ({
            page,
            take,
            registers,
            totalPages: Math.ceil(total / take),
            totalRegisters: total
        });
    }
}
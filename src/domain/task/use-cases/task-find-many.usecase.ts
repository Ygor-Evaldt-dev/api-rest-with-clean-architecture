import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { PaginationInput, PaginationOutput } from "@/domain/shared/types";
import { Task } from "@/domain/task/entity/task.entity";
import { NotFoundException } from "@/common/exceptions";

export class TaskFindMany implements IUseCase<PaginationInput, PaginationOutput<Task>> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        page,
        take
    }: PaginationInput): Promise<PaginationOutput<Task>> {
        const [registers, total] = await Promise.all([
            this.repository.findMany({ page, take }),
            this.repository.total()
        ]);

        if (registers.length === 0)
            throw new NotFoundException("Nenhuma tarefa encontrada");

        return ({
            page,
            take,
            registers,
            totalRegisters: total,
            totalPages: Math.ceil(total / take)
        });
    }
}
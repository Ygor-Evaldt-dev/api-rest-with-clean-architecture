import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { NotFoundException } from "@/common/exceptions";
import { PaginationOutput } from "@/domain/shared/types";
import { FilterTaskDto } from "../dtos";

export class TaskFilter implements IUseCase<FilterTaskDto, PaginationOutput<Task>> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(params: FilterTaskDto): Promise<PaginationOutput<Task>> {
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
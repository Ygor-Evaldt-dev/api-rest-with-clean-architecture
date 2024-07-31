import { IService } from "@/domain/shared/service.interface";
import { PaginationInput, PaginationOutput } from "../../utils";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskFindManyUseCase, TaskFindTotalUseCase } from "@/domain/task/use-cases";

export class TaskFindManyService implements IService<PaginationInput, PaginationOutput<Task>> {
    constructor(
        private readonly findMany: TaskFindManyUseCase,
        private readonly findTotal: TaskFindTotalUseCase
    ) { }

    async execute({
        page,
        take
    }: PaginationInput): Promise<PaginationOutput<Task>> {
        const [registers, total] = await Promise.all([
            this.findMany.execute({ page, take }),
            this.findTotal.execute()
        ]);

        return ({
            page,
            take,
            totalPages: Math.ceil(total / take),
            totalRegisters: total,
            registers
        });
    }

}
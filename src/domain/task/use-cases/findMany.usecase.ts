import { ITaskRepository } from "@/domain/ports";
import { IService } from "@/domain/shared/service.interface";
import { Task } from "@/domain/task/entity/task.entity";

export type Input = {
    page: number;
    take: number;
}

export type Output = {
    page: number;
    take: number;
    registers: Task[];
    totalPages: number;
    totalRegisters: number;
}

export class FindManyUseCase implements IService<Input, Output> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute({
        page,
        take
    }: Input): Promise<Output> {
        const [registers, total] = await Promise.all([
            this.repository.findMany({ page, take }),
            this.repository.total()
        ]);

        return ({
            page,
            take,
            registers,
            totalPages: Math.ceil(total / take),
            totalRegisters: total
        });
    }
}
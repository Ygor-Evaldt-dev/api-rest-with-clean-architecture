import { IService } from "@/domain/shared/service.interface";
import { PaginationInput, PaginationOutput } from "../../utils";
import { Task } from "@/domain/task/entity/task.entity";
import { FindManyUseCase, FindTotalUseCase } from "@/domain/task/use-cases";

export class FindManyService implements IService<PaginationInput, PaginationOutput<Task>> {
    constructor(
        private readonly findMany: FindManyUseCase,
        private readonly findTotal: FindTotalUseCase
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
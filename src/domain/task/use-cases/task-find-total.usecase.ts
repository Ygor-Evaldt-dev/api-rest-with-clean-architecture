import { ITaskRepository } from "@/domain/ports";
import { IUseCase } from "@/domain/shared/usecase.interface";

export class TaskFindTotalUseCase implements IUseCase<void, number> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(): Promise<number> {
        return await this.repository.total();
    }

}
import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";

export class TaskRemoveUseCase implements IUseCase<string, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }

}
import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IService } from "@/domain/shared/service.interface";

export class TaskRemoveUseCase implements IService<string, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }

}
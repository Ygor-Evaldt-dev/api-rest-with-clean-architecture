import { NotFoundException } from "@/common/exceptions";
import { IService } from "@/domain/shared/service.interface";
import { TaskFindUniqueUseCase, TaskRemoveUseCase } from "@/domain/task/use-cases";

export class TaskRemoveService implements IService<string, void> {
    constructor(
        private readonly findUnique: TaskFindUniqueUseCase,
        private readonly remove: TaskRemoveUseCase
    ) { }

    async execute(id: string): Promise<void> {
        const task = await this.findUnique.execute(id);
        if (task === null)
            throw new NotFoundException("Tarefa não cadastrada");

        await this.remove.execute(id);
    }
}
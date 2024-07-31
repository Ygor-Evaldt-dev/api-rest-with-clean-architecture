import { NotFoundException } from "@/common/exceptions";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { TaskFindUniqueUseCase, TaskRemoveUseCase } from "@/domain/task/use-cases";

export class TaskRemoveService implements IUseCase<string, void> {
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
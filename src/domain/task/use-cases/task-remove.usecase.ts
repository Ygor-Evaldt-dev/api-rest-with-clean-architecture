import { NotFoundException } from "@/common/exceptions";
import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";

export class TaskRemove implements IUseCase<string, void> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<void> {
        const task = await this.repository.findUnique(id);
        if (task === null)
            throw new NotFoundException("Tarefa não cadastrada");

        await this.repository.delete(id);
    }
}
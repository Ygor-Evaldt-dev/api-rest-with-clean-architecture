import { NotFoundException } from "@/common/exceptions";
import { IService } from "@/domain/shared/service.interface";
import { FindUniqueUseCase, RemoveUseCase } from "@/domain/task/use-cases";

export class RemoveService implements IService<string, void> {
    constructor(
        private readonly findUnique: FindUniqueUseCase,
        private readonly remove: RemoveUseCase
    ) { }

    async execute(id: string): Promise<void> {
        const task = await this.findUnique.execute(id);
        if (task === null)
            throw new NotFoundException("Tarefa não cadastrada");

        await this.remove.execute(id);
    }
}
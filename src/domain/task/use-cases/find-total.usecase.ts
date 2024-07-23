import { ITaskRepository } from "@/domain/ports";
import { IService } from "@/domain/shared/service.interface";

export class FindTotalUseCase implements IService<void, number> {
    constructor(
        private readonly repository: ITaskRepository
    ) { }

    async execute(): Promise<number> {
        return await this.repository.total();
    }

}
import { ITaskRepository } from "@/domain/ports";
import { CreateService } from "./create.service";
import { CreateUseCase } from "@/domain/task/use-cases";

export class TaskModule {
    readonly createService: CreateService;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        const createUseCase = new CreateUseCase(this.repository);

        this.createService = new CreateService(createUseCase);
    }
}
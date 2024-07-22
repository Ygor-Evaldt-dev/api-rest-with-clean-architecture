import { ITaskRepository } from "@/domain/ports";
import { CreateService } from "./create.service";
import { CreateUseCase, FindUniqueUseCase, UpdateUseCase } from "@/domain/task/use-cases";
import { UpdateService } from "./update.service";

export class TaskModule {
    readonly createService: CreateService;
    readonly updateService: UpdateService;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        const createUseCase = new CreateUseCase(this.repository);
        const findUniqueUseCase = new FindUniqueUseCase(this.repository);
        const updateUseCase = new UpdateUseCase(this.repository);

        this.createService = new CreateService(createUseCase);
        this.updateService = new UpdateService(findUniqueUseCase, updateUseCase);
    }
}
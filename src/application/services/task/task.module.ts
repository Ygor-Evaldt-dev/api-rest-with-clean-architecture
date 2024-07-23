import { ITaskRepository } from "@/domain/ports";
import { CreateService } from "./create.service";
import { CreateUseCase, FindManyUseCase, FindTotalUseCase, FindUniqueUseCase, RemoveUseCase, UpdateUseCase } from "@/domain/task/use-cases";
import { UpdateService } from "./update.service";
import { FindManyService } from "./find-many.service";
import { RemoveService } from "./remove.service";

export class TaskModule {
    readonly createService: CreateService;
    readonly updateService: UpdateService;
    readonly findManyService: FindManyService;
    readonly removeService: RemoveService;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        const createUseCase = new CreateUseCase(this.repository);
        const findUniqueUseCase = new FindUniqueUseCase(this.repository);
        const findManyUseCase = new FindManyUseCase(this.repository);
        const findTotal = new FindTotalUseCase(this.repository);
        const updateUseCase = new UpdateUseCase(this.repository);
        const removeUseCase = new RemoveUseCase(this.repository);

        this.createService = new CreateService(createUseCase);
        this.updateService = new UpdateService(findUniqueUseCase, updateUseCase);
        this.findManyService = new FindManyService(findManyUseCase, findTotal);
        this.removeService = new RemoveService(findUniqueUseCase, removeUseCase);
    }
}
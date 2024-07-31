import { ITaskRepository } from "@/domain/ports";
import { TaskCreateUseCase, TaskFindManyUseCase, TaskFindTotalUseCase, TaskFindUniqueUseCase, TaskRemoveUseCase, TaskUpdateUseCase } from "@/domain/task/use-cases";
import { TaskCreateService, TaskUpdateService, TaskFindManyService, TaskRemoveService } from "@/application/services/task";

export class TaskModule {
    readonly createService: TaskCreateService;
    readonly updateService: TaskUpdateService;
    readonly findManyService: TaskFindManyService;
    readonly removeService: TaskRemoveService;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        const createUseCase = new TaskCreateUseCase(this.repository);
        const findUniqueUseCase = new TaskFindUniqueUseCase(this.repository);
        const findManyUseCase = new TaskFindManyUseCase(this.repository);
        const findTotal = new TaskFindTotalUseCase(this.repository);
        const updateUseCase = new TaskUpdateUseCase(this.repository);
        const removeUseCase = new TaskRemoveUseCase(this.repository);

        this.createService = new TaskCreateService(createUseCase);
        this.updateService = new TaskUpdateService(findUniqueUseCase, updateUseCase);
        this.findManyService = new TaskFindManyService(findManyUseCase, findTotal);
        this.removeService = new TaskRemoveService(findUniqueUseCase, removeUseCase);
    }
}
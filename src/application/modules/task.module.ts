import { ITaskRepository } from "@/domain/ports";
import { TaskCreate, TaskFilter, TaskFindMany, TaskFindUnique, TaskRemove, TaskUpdate } from "@/domain/task/use-cases";

export class TaskModule {
    readonly create: TaskCreate;
    readonly update: TaskUpdate;
    readonly findUnique: TaskFindUnique;
    readonly findMany: TaskFindMany;
    readonly filter: TaskFilter;
    readonly remove: TaskRemove;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        this.create = new TaskCreate(this.repository);
        this.update = new TaskUpdate(this.repository);
        this.findUnique = new TaskFindUnique(this.repository);
        this.findMany = new TaskFindMany(this.repository);
        this.filter = new TaskFilter(this.repository);
        this.remove = new TaskRemove(this.repository);
    }
}
import { ITaskRepository } from "@/domain/ports";
import { TaskCreate, TaskFindMany, TaskFindUnique, TaskRemove, TaskUpdate } from "@/domain/task/use-cases";

export class TaskModule {
    readonly create: TaskCreate;
    readonly update: TaskUpdate;
    readonly findUnique: TaskFindUnique;
    readonly findMany: TaskFindMany;
    readonly remove: TaskRemove;

    constructor(
        private readonly repository: ITaskRepository,
    ) {
        this.create = new TaskCreate(this.repository);
        this.update = new TaskUpdate(this.repository);
        this.findUnique = new TaskFindUnique(this.repository);
        this.findMany = new TaskFindMany(this.repository);
        this.remove = new TaskRemove(this.repository);
    }
}
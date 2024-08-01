import { Express } from "express";
import { TaskModule } from "@/application/modules/task.module";
import { TaskCreateController, TaskUpdateController, TaskFindManyController, TaskRemoveController, TaskFindUniqueController, TaskFilterController } from "@/presentation/controllers/task";

export class TaskRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: TaskModule,
        private readonly middlewares: any[]
    ) {
        const {
            create,
            update,
            findUnique,
            findMany,
            filter,
            remove
        } = this.module;

        new TaskCreateController(this.server, create, this.middlewares);
        new TaskFindUniqueController(this.server, findUnique, this.middlewares);
        new TaskFindManyController(this.server, findMany, this.middlewares);
        new TaskFilterController(this.server, filter, this.middlewares);
        new TaskUpdateController(this.server, update, this.middlewares);
        new TaskRemoveController(this.server, remove, this.middlewares);
    }
}
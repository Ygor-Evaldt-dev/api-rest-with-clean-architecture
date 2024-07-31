import { Express } from "express";
import { TaskModule } from "@/application/services/task";
import { TaskCreateController, TaskUpdateController, TaskFindManyController, TaskRemoveController } from "@/presentation/controllers/task";

export class TaskRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: TaskModule,
        private readonly middlewares: any[]
    ) {
        const {
            create,
            update,
            findManyService,
            removeService
        } = this.module;

        new TaskCreateController(this.server, create, this.middlewares);
        new TaskUpdateController(this.server, update, this.middlewares);
        new TaskFindManyController(this.server, findManyService, this.middlewares);
        new TaskRemoveController(this.server, removeService, this.middlewares);
    }
}
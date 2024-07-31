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
            createService,
            updateService,
            findManyService,
            removeService
        } = this.module;

        new TaskCreateController(this.server, createService, this.middlewares);
        new TaskUpdateController(this.server, updateService, this.middlewares);
        new TaskFindManyController(this.server, findManyService, this.middlewares);
        new TaskRemoveController(this.server, removeService, this.middlewares);
    }
}
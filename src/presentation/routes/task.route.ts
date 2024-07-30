import { Express } from "express";
import { TaskModule } from "@/application/services/task";
import { CreateController, UpdateController } from "@/presentation/controllers/task";
import { FindManyController } from "@/presentation/controllers/task/find-many.controller";
import { RemoveController } from "@/presentation/controllers/task/remove.controller";

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

        new CreateController(this.server, createService, this.middlewares);
        new UpdateController(this.server, updateService, this.middlewares);
        new FindManyController(this.server, findManyService, this.middlewares);
        new RemoveController(this.server, removeService, this.middlewares);
    }
}
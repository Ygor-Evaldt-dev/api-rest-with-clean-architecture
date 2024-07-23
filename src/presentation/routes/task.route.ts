import { TaskModule } from "@/application/services/task";
import { Express } from "express";
import { CreateController, UpdateController } from "../controllers/task";
import { FindManyController } from "../controllers/task/find-many.controller";
import { RemoveController } from "../controllers/task/remove.controller";

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
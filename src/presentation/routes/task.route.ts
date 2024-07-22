import { TaskModule } from "@/application/services/task";
import { Express } from "express";
import { CreateController, UpdateController } from "../controllers/task";

export class TaskRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: TaskModule,
        private readonly middlewares: any[]
    ) {
        const {
            createService,
            updateService
        } = this.module;

        new CreateController(this.server, createService, this.middlewares);
        new UpdateController(this.server, updateService, this.middlewares);

    }
}
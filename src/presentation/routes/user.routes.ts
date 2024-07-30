import { Express } from "express";

import { UserModule } from "@/application/services/user/user.module";
import { CreateController } from "@/presentation/controllers/user/create.controller";
import { UpdateController } from "@/presentation/controllers/user/update.controller";
import { FindController } from "@/presentation/controllers/user/find.controller";
import { DeleteController } from "@/presentation/controllers/user/delete.controller";

export class UserRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: UserModule,
        private readonly middlewares: any[]
    ) {
        const {
            createService,
            findService,
            updateService,
            deleteService: removeService
        } = this.module;

        new CreateController(this.server, createService);
        new FindController(this.server, findService, middlewares);
        new UpdateController(this.server, updateService, middlewares);
        new DeleteController(this.server, removeService, middlewares);
    }
}

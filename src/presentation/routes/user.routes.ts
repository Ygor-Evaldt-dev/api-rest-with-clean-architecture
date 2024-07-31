import { Express } from "express";
import { UserModule } from "@/application/services/user/user.module";
import { UserCreateController, UserUpdateController, UserFindController, UserDeleteController } from "@/presentation/controllers/user";

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

        new UserCreateController(this.server, createService);
        new UserFindController(this.server, findService, this.middlewares);
        new UserUpdateController(this.server, updateService, this.middlewares);
        new UserDeleteController(this.server, removeService, this.middlewares);
    }
}

import { Express } from "express";
import { UserModule } from "@/application/modules/user.module";
import { UserCreateController, UserUpdateController, UserFindController, UserDeleteController } from "@/presentation/controllers/user";

export class UserRoutes {
    constructor(
        private readonly server: Express,
        private readonly userModule: UserModule,
        private readonly middlewares: any[]
    ) {
        const {
            create,
            find,
            update,
            remove
        } = this.userModule;

        new UserCreateController(this.server, create);
        new UserFindController(this.server, find, this.middlewares);
        new UserUpdateController(this.server, update, this.middlewares);
        new UserDeleteController(this.server, remove, this.middlewares);
    }
}

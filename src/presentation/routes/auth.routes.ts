import { Express } from "express";
import { LoginController } from "@/presentation/controllers/auth/login.controller";
import { AuthModule } from "@/application/services/auth/auth.module";

export class AuthRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: AuthModule
    ) {
        new LoginController(this.server, this.module.loginService);
    }
}

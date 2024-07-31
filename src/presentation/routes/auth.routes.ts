import { Express } from "express";
import { AuthLoginController } from "@/presentation/controllers/auth/auth-login.controller";
import { AuthModule } from "@/application/services/auth/auth.module";

export class AuthRoutes {
    constructor(
        private readonly server: Express,
        private readonly module: AuthModule
    ) {
        new AuthLoginController(this.server, this.module.loginService);
    }
}

import { Express } from "express";
import { LoginService } from "@/application/services/auth/login.service";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { UserModule } from "@/domain/user/user.module";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { PrismaRepository } from "@/infra/repositories/user/prisma.repository";
import { LoginController } from "@/presentation/controllers/auth/login.controller";

export class AuthRoute {
    constructor(
        private readonly server: Express,
        private readonly tokenProvider: ITokenProvider
    ) {
        const repository = new PrismaRepository();
        const encrypter = new BcryptAdapter();
        const userModule = new UserModule(repository, encrypter);

        const { findUnique } = userModule.usecase;

        const loginService = new LoginService(findUnique, encrypter, this.tokenProvider);

        new LoginController(this.server, loginService);
    }
}
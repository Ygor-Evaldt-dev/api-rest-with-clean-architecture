import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { UserFindService } from "../user/user-find.service";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { AuthLoginService } from "./auth-login.service";

export class AuthModule {
    readonly loginService: AuthLoginService;

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) {
        this.loginService = new AuthLoginService(
            this.userRepository,
            this.encrypter,
            this.tokenProvider
        );
    }
}

import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { FindService } from "../user/find.service";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { LoginService } from "./login.service";

export class AuthModule {
    readonly loginService: LoginService

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) {
        this.loginService = new LoginService(this.userRepository, this.encrypter, this.tokenProvider)
    }
}
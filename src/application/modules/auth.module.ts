import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { AuthEmailPasswordService } from "@/application/services/auth";

export class AuthModule {
    readonly emailPassword: AuthEmailPasswordService;

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) {
        this.emailPassword = new AuthEmailPasswordService(
            this.userRepository,
            this.encrypter,
            this.tokenProvider
        );
    }
}

import { IService } from "@/domain/shared/service.interface";
import { LoginDto } from "./dtos/login.dto";
import { TokenDto } from "./dtos/token.dto";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { BadRequestException } from "@/common/exceptions/bad-request.exception";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { removePassword } from "@/application/utils/remove-password";

export class LoginService implements IService<LoginDto, TokenDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) { }

    async execute({ email, password }: LoginDto): Promise<TokenDto> {
        const user = await this.userRepository.findUnique({ email });
        if (!user) throw new NotFoundException("Usuário não cadastrado");

        const isPasswordValid = await this.encrypter.compare(
            password,
            user.password!
        );
        if (!isPasswordValid) throw new BadRequestException("Senha inválida");

        const accessToken = this.tokenProvider.generate({
            user: removePassword(user)
        });

        return { accessToken };
    }
}

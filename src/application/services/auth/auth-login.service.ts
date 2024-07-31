import { IService } from "@/domain/shared/service.interface";
import { LoginDto, TokenDto } from "./dtos";
import { IEncrypter, ITokenProvider, IUserRepository } from "@/domain/ports";
import { NotFoundException, UnauthorizedException } from "@/common/exceptions";
import { removePassword } from "@/application/utils/remove-password";

export class AuthLoginService implements IService<LoginDto, TokenDto> {
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
        if (!isPasswordValid) throw new UnauthorizedException("Senha inválida");

        const accessToken = this.tokenProvider.generate({
            user: removePassword(user)
        });

        return { accessToken };
    }
}

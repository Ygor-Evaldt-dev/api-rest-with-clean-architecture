import { IUseCase } from "@/domain/shared/usecase.interface";
import { LoginDto, TokenDto } from "./dtos";
import { IEncrypter, ITokenProvider, IUserRepository } from "@/domain/ports";
import { NotFoundException, UnauthorizedException } from "@/common/exceptions";
import { removePassword } from "@/domain/shared/utils/remove-password";

export class AuthEmailPasswordService implements IUseCase<LoginDto, TokenDto> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) { }

    async execute({
        email,
        password
    }: LoginDto): Promise<TokenDto> {
        const user = await this.userRepository.findUnique({ email: email.complete });
        if (user === null)
            throw new NotFoundException("Usuário não cadastrado");

        const isPasswordValid = await this.encrypter.compare(password, user.password?.value!);
        if (!isPasswordValid)
            throw new UnauthorizedException("Senha inválida");

        const accessToken = this.tokenProvider.generate({
            user: removePassword(user)
        });

        return { accessToken };
    }
}

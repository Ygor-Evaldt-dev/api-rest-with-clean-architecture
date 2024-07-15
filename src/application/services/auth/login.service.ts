import { IService } from "@/domain/shared/service.interface";
import { LoginDto } from "./dtos/login.dto";
import { TokenDto } from "./dtos/token.dto";
import { User } from "@/domain/user/entity/user.entity";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { BadRequestException } from "@/common/exceptions/bad-request.exception";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";

export class loginService implements IService<LoginDto, TokenDto> {
    constructor(
        private readonly findUnique: FindUnique,
        private readonly encrypter: IEncrypter,
        private readonly tokenProvider: ITokenProvider
    ) { }

    async execute({
        email,
        password
    }: LoginDto): Promise<TokenDto> {
        const user = await this.findUnique.execute(email);
        if (!user)
            throw new NotFoundException('Usuário não cadastrado');

        const isPasswordValid = await this.encrypter.compare(password, user.password!);
        if (!isPasswordValid)
            throw new BadRequestException('Senha inválida');

        const token = this.tokenProvider.generate({
            sub: user.id.value,
            email: user.email.complete
        });

        return ({ token });
    }

}
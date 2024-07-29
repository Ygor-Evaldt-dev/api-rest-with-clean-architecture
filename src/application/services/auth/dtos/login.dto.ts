import { IsDefined, IsEmail } from "class-validator";

export class LoginDto {
    @IsDefined()
    @IsEmail({}, { message: "E-mail inválido" })
    readonly email: string;

    @IsDefined({ message: "Senha é obrigatória" })
    readonly password: string

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }
}

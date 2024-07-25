import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: "Email inválido" })
    @Transform(({ value }) => value.toString().trim().toLowerCase())
    readonly email: string;

    @IsStrongPassword(
        { minLength: 6, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
        { message: "Senha deve ter no mínimo 6 caracteres contendo no mínimo 1 número, 1 letra maiúscula e 1 caractere especial " }
    )
    @Transform(({ value }) => value.trim())
    readonly password: string;

    @IsOptional()
    @Length(3, 150, { message: "Nome deve ter no mínimo 3 e no máximo 150 caracteres" })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    readonly name?: string;

    constructor(
        email: string,
        password: string,
        name?: string
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

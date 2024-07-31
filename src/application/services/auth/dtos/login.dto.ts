import { BadRequestException } from "@/common/exceptions";
import { Email } from "@/domain/shared/value-objects";

export class LoginDto {
    readonly email: Email;
    readonly password: string

    constructor(
        email: string,
        password: string
    ) {
        if (!email)
            throw new BadRequestException("E-mail é obrigatório");
        if (!password)
            throw new BadRequestException("Senha é obrigatória");

        this.email = new Email(email);
        this.password = password;
    }
}

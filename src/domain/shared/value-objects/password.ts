import { BadRequestException } from "@/common/exceptions";

export class Password {
    readonly value: string

    constructor(
        value: string
    ) {
        const minLength = 8;
        const minNumbers = 1;
        const minSymbols = 1;
        const minUppercase = 1

        if (value.length < minLength)
            throw new BadRequestException(`A senha deve conter no mínimo ${minLength} caracteres`);
        if (!this.isStrong(value))
            throw new BadRequestException(`A senha deve conter no mínimo ${minNumbers} número, ${minUppercase} letra maiúscula e ${minSymbols} caractere especial`);
        if (this.hasWhiteSpaces(value))
            throw new BadRequestException("A senha não pode conter espaços em branco");

        this.value = value.trim();
    }

    private isStrong(password: string): boolean {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    }

    private hasWhiteSpaces(password: string) {
        const regex = /\s/;
        return regex.test(password);
    }
}
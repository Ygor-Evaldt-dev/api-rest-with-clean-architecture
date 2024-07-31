import { BadRequestException } from "@/common/exceptions";
import { capitalize, partial } from "@/domain/shared/utils";

export class Title {
    readonly complete: string;
    readonly partial: string;

    constructor(
        complete: string,
        private readonly minLength: number = 1,
        private readonly maxLength: number = 50
    ) {
        this.complete = capitalize(complete.trim());

        const errorMessage = "O título deve conter no";
        if (this.complete.length < this.minLength)
            throw new BadRequestException(`${errorMessage} mínimo ${this.minLength} caracteres`);

        if (this.complete.length > this.maxLength)
            throw new BadRequestException(`${errorMessage} máximo ${this.maxLength} caracteres`);

        this.partial = partial(this.complete, 12);
    }
}
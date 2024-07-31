import { BadRequestException } from "@/common/exceptions";
import { partial } from "@/domain/shared/utils";

export class LongText {
    readonly complete: string;
    readonly partial: string;

    constructor(
        complete: string,
        private readonly maxLength: number = 150
    ) {
        this.complete = complete.trim();

        if (this.complete.length > this.maxLength)
            throw new BadRequestException(`O texto deve conter no máximo ${this.maxLength} caracteres`);

        this.partial = partial(this.complete, 50);
    }
}
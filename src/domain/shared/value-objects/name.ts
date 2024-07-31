import { BadRequestException } from "@/common/exceptions";
import { capitalize } from "@/domain/shared/utils";

export class Name {
    readonly complete: string;
    readonly firstName: string;
    readonly lastName: string;

    constructor(complete: string) {
        this.complete = capitalize(complete.trim());

        const min = 3;
        const max = 150;
        if (this.complete.length < min)
            throw new BadRequestException(`Nome deve ter no mínimo ${min} caracteres`);
        if (this.complete.length > max)
            throw new BadRequestException(`Nome deve ter no máximo ${max} caracteres`);


        this.firstName = this.getFirstName();
        this.lastName = this.getLastName();
    }

    private getFirstName() {
        return this.complete.split(" ")[0];
    }

    private getLastName() {
        const words = this.complete.split(" ");
        if (words.length <= 1) return "";

        return words[words.length - 1];
    }
}

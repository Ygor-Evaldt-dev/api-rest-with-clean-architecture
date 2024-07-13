import { capitalize } from "@/domain/shared/util";

export class Name {
    readonly complete: string;
    readonly firstName: string;
    readonly lastName: string

    constructor(
        complete: string
    ) {
        this.complete = capitalize(complete.trim());
        this.firstName = this.getFirstName();
        this.lastName = this.getLastName();
    }

    private getFirstName() {
        return this.complete.split(' ')[0];
    }

    private getLastName() {
        const words = this.complete.split(' ');
        return words[words.length - 1];
    }
}
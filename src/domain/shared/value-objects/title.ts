import { capitalize, partial } from "../util";

export class Title {
    readonly complete: string;
    readonly partial: string;

    constructor(
        complete: string
    ) {
        this.complete = capitalize(complete.trim());
        this.partial = partial(this.complete, 12);
    }
}
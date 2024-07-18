import { partial } from "../util";

export class LongText {
    readonly complete: string;
    readonly partial: string;

    constructor(
        complete: string
    ) {
        this.complete = complete.trim();
        this.partial = partial(this.complete, 50);
    }
}
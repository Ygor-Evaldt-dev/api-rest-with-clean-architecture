export class Email {
    readonly complete: string;
    readonly provider: string;

    constructor(
        complete: string
    ) {
        this.complete = complete;
        this.provider = this.getProvider();
    }

    getProvider(): string {
        return this.complete.split("@")[1].split(".")[0];
    }

}
export class Email {
    readonly complete: string;
    readonly provider: string;

    constructor(complete: string) {
        this.complete = complete.trim().toLowerCase();
        this.provider = this.getProvider();
    }

    getProvider(): string {
        if (!this.complete.includes("@")) return "";
        return this.complete.split("@")[1].split(".")[0];
    }
}

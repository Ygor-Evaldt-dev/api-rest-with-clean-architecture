import { BadRequestException } from "@/common/exceptions";

export class Email {
    readonly complete: string;
    readonly provider: string;

    constructor(complete: string) {
        if (!this.isValid(complete))
            throw new BadRequestException("Email inválido");

        this.complete = complete.trim().toLowerCase();
        this.provider = this.getProvider(this.complete);
    }

    private getProvider(email: string): string {
        if (!email.includes("@")) return "";
        return email.split("@")[1].split(".")[0];
    }

    private isValid(email: string): boolean {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
}

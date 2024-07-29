export class UnauthorizedException extends Error {
    constructor(name: string) {
        super(name);
    }
}
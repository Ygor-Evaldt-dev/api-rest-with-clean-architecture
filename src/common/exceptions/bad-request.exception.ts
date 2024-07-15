export class BadRequestException extends Error {
    constructor(name: string) {
        super(name);
    }
}
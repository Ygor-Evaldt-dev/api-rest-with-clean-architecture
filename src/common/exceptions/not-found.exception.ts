export class NotFoundException extends Error {
    constructor(name: string) {
        super(name);
    }
}
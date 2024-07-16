export class ConflictException extends Error {
	constructor(name: string) {
		super(name);
	}
}

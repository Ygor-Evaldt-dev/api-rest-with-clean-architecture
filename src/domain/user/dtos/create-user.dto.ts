export class CreateUserDto {
    constructor(
        readonly email: string,
        readonly password: string,
        readonly name?: string
    ) { }
}

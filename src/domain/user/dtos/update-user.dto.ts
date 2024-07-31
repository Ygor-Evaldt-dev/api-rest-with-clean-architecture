export class UpdateUserDto {
    constructor(
        readonly id: string,
        readonly email?: string,
        readonly password?: string,
        readonly name?: string
    ) { }
}

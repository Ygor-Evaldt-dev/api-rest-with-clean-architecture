export class FindManyTaskDto {
    constructor(
        readonly page: number = 0,
        readonly take: number = 25,
        readonly userId: string
    ) { }
}
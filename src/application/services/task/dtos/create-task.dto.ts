export class CreateTaskDto {
    constructor(
        readonly title: string,
        readonly status: string,
        readonly userId: string,
        readonly description?: string
    ) { }
}
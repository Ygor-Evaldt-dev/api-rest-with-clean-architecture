import { Entity } from "@/domain/shared/entity";
import { StatusEnum } from "@/domain/shared/enums/status.enum";
import { LongText, Title, Status } from "@/domain/shared/value-objects";
import { TaskParams } from "@/domain/task/entity/task-params";

export class Task extends Entity {
    readonly title: Title;
    readonly description?: LongText;
    readonly status: Status;

    constructor({
        id,
        title,
        description,
        status
    }: TaskParams) {
        super(id!);

        this.title = new Title(title);
        this.description = description ? new LongText(description) : undefined;
        this.status = status ? new Status(status) : new Status(StatusEnum.pending);
    }
}

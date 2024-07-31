import { Entity } from "@/domain/shared/entity";
import { Status } from "@/domain/shared/enums/status";
import { LongText, Title } from "@/domain/shared/value-objects";
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
        this.status = status ? status : Status.pending;
    }
}

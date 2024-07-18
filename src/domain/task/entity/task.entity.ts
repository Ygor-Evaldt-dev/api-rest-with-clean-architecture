import { Entity } from "@/domain/shared/entity";
import { Status } from "@/domain/shared/enums/status";
import { LongText } from "@/domain/shared/value-objects/long-text";
import { Title } from "@/domain/shared/value-objects/title";
import { Params } from "@/domain/task/entity/params";

export class TaskEntity extends Entity {
    readonly title: Title;
    readonly description?: LongText;
    readonly status: Status;

    constructor({
        id,
        title,
        description,
        status
    }: Params) {
        super(id!);

        this.title = new Title(title);
        this.description = description ? new LongText(description) : undefined;
        this.status = status ? status : Status.pending;
    }
}

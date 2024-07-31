import { Entity } from "@/domain/shared/entity";
import { Email, Name, Password } from "@/domain/shared/value-objects";
import { UserParams } from "@/domain/user/entity/user-params";

export class User extends Entity {
    readonly email: Email;
    readonly password?: Password;
    readonly name?: Name;

    constructor({ id, email, password, name }: UserParams) {
        super(id!);

        this.email = new Email(email);
        this.password = password ? new Password(password) : undefined;
        this.name = name ? new Name(name) : undefined;
    }
}

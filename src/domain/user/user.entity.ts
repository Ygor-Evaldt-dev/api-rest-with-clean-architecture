import Entity from "@/domain/shared/entity";

export class User extends Entity {
    readonly email: string;
    readonly password?: string;
    readonly name?: string;

    constructor(
        email: string,
        password?: string,
        name?: string,
        id?: string
    ) {
        super(id!)

        this.email = email;
        this.password = password;
        this.name = name;
    }
}
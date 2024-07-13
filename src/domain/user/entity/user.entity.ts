import { Entity } from "@/domain/shared/entity";
import { Params } from '@/domain/user/entity/params';

export class User extends Entity {
    readonly email: string;
    readonly password?: string;
    readonly name?: string;

    constructor({
        id,
        email,
        password,
        name
    }: Params) {
        super(id!)

        this.email = email;
        this.password = password;
        this.name = name;
    }
}
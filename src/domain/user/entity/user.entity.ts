import { Entity } from "@/domain/shared/entity";
import { Email } from "@/domain/shared/value-objects/email";
import { Name } from "@/domain/shared/value-objects/Name";
import { Params } from "@/domain/user/entity/params";

export class User extends Entity {
	readonly email: Email;
	readonly password?: string;
	readonly name?: Name;

	constructor({ id, email, password, name }: Params) {
		super(id!);

		this.email = new Email(email);
		this.password = password;
		this.name = name ? new Name(name) : undefined;
	}
}

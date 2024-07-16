import { User } from "@/domain/user/entity/user.entity";

export function removePassword(user: User): User {
	return Object.assign(user, {
		password: undefined
	});
}

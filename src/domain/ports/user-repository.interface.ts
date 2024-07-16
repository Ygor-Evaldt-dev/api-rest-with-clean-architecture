import { User } from "@/domain/user//entity/user.entity";

export interface IUserRepository {
	create(user: User): Promise<void>;
	findUnique(params: { id?: string; email?: string }): Promise<User | null>;
	update(user: User): Promise<void>;
	delete(id: string): Promise<void>;
}

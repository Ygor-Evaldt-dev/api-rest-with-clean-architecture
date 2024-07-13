import { User } from "@/domain/user/user.entity";

export interface IUserRepository {
    create(user: User): Promise<void>;
    findUnique(id?: string, email?: string): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
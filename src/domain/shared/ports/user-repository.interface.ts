import { User } from "@/domain/user/user.entity";

export interface IUserRepository {
    create(user: User): Promise<void>
}
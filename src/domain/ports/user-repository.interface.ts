import { User } from "@/domain/user//entity/user.entity";
import { FindUniqueUserDto } from "@/domain/user/dtos";

export interface IUserRepository {
    create(user: User): Promise<void>;
    findUnique(params: FindUniqueUserDto): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}

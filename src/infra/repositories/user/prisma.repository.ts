import { IUserRepository } from "@/domain/shared/ports/user-repository.interface";
import { User } from "@/domain/user/user.entity";

export class PrismaRepository implements IUserRepository {

    async create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

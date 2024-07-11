import { IUserRepository } from "@/domain/shared/ports/user-repository.interface";
import { User } from "@/domain/user/user.entity";
import { PrismaClient } from "@prisma/client";

export class PrismaRepository implements IUserRepository {
    private readonly prisma = new PrismaClient();

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id.value,
                email: user.email,
                password: user.password!
            }
        });
    }

}

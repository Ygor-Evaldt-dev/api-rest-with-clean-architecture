import { IUserRepository } from "@/domain/shared/ports/user-repository.interface";
import { User } from "@/domain/user/user.entity";
import { PrismaClient } from "@prisma/client";
import { UserDto } from "./user-dto";

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

    async findUnique(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        return user ? this.fromDatabase(user) : null;
    }

    private fromDatabase({
        id,
        email,
        password,
        name
    }: UserDto) {
        return new User(
            email,
            password,
            name ?? undefined,
            id
        );
    }

}

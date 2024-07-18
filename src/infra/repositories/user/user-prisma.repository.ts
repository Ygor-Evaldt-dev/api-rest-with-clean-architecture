import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { User } from "@/domain/user//entity/user.entity";
import { PrismaClient } from "@prisma/client";
import { UserDto } from "./user-dto";

export class UserPrismaRepository implements IUserRepository {
    private readonly prisma = new PrismaClient();

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id.value,
                email: user.email.complete.toLowerCase(),
                password: user.password!,
                name: user.name?.complete
            }
        });
    }

    async findUnique({
        id,
        email
    }: {
        id?: string;
        email?: string;
    }): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id, email }
        });

        return user ? this.fromDatabase(user) : null;
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: user.id.value
            },
            data: {
                email: user.email.complete.toLowerCase(),
                password: user.password!,
                name: user.name?.complete.toLowerCase()
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }

    private fromDatabase({ id, email, password, name }: UserDto) {
        return new User({
            id,
            email,
            password,
            name: name ?? undefined
        });
    }
}

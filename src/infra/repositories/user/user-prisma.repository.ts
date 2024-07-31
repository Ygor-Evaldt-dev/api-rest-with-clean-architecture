import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { User } from "@/domain/user/entity/user.entity";
import { PrismaClient } from "@prisma/client";
import { User as UserPrisma } from "@prisma/client";

export class UserPrismaRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: this.toDatabase(user)
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
            data: this.toDatabase(user)
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }

    private toDatabase({
        id,
        email,
        password,
        name
    }: User) {
        return ({
            id: id.value,
            email: email.complete,
            password: password?.value!,
            name: name?.complete?.toLowerCase()
        });
    }

    private fromDatabase({ id, email, password, name }: UserPrisma) {
        return new User({
            id,
            email,
            password,
            name: name ?? undefined
        });
    }
}

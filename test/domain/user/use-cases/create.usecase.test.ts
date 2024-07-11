import { User } from "@/domain/user/user.entity";
import { PrismaRepository } from "@/infra/repositories/user/prisma.repository";
import { UserModule } from "@/domain/user/user.module";
import { Create } from "@/domain/user/use-cases/create.usecase";

describe('create', () => {
    let create: Create;

    beforeAll(() => {
        const userPrismaRepository = new PrismaRepository();
        create = new UserModule(userPrismaRepository).usecase.create;
    });

    it('should create a new user', async () => {
        const user = new User('teste@gmail.com', 'senha@teste');
        await expect(create.execute(user)).resolves.not.toThrow();
    });

    it('should throw error if user is already registred', async () => {
        const user = new User('teste@gmail.com', 'any_password');
        await expect(create.execute(user)).rejects.toThrow();
    });

});
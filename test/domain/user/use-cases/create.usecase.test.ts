import { User } from "@/domain/user/user.entity";
import { PrismaRepository } from "@/infra/repositories/user/prisma.repository";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { UserModule } from "@/domain/user/user.module";

describe('create', () => {
    let create: Create;

    beforeAll(() => {
        const userPrismaRepository = new PrismaRepository();
        const encrypter = new BcryptAdapter();
        const userModule = new UserModule(userPrismaRepository, encrypter);

        create = userModule.usecase.create;
    });

    it('should create a new user', async () => {
        const user = new User('teste@gmail.com', 'Senha@test3');
        await expect(create.execute(user)).resolves.not.toThrow();
    });

    it('should throw error if user is already registred', async () => {
        const user = new User('teste@gmail.com', 'any_password');
        await expect(create.execute(user)).rejects.toThrow();
    });

});
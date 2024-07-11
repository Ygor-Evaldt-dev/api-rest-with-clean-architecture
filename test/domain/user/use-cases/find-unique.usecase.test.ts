import { PrismaRepository } from "@/infra/repositories/user/prisma.repository";
import { UserModule } from "@/domain/user/user.module";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";

describe('find unique', () => {
    let findUnique: FindUnique;

    beforeAll(() => {
        const userPrismaRepository = new PrismaRepository();
        const userModule = new UserModule(userPrismaRepository);

        findUnique = userModule.usecase.findUnique;
    });

    it('should return an user registred', async () => {
        const email = 'teste@gmail.com';
        const user = await findUnique.execute(email);

        expect(user).toBeDefined();
        expect(user?.email).toBe(email);
    });

    it('should return null if user if not registred', async () => {
        const user = await findUnique.execute('any_email@gmail.com');
        expect(user).toBeNull();
    });

});
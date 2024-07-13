import { User } from "@/domain/user//entity/user.entity";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { getTestModule } from "../get-test-module";

describe('create', () => {
    let create: Create;

    beforeAll(() => {
        const module = getTestModule();
        create = module.usecase.create;
    });

    it('should create a new user', async () => {
        const user = new User({
            email: 'teste@gmail.com',
            password: 'Senha@test3'
        });
        await expect(create.execute(user)).resolves.not.toThrow();
    });

    it('should throw error if user is already registred', async () => {
        const user = new User({
            email: 'teste@gmail.com',
            password: 'any_password'
        });
        await expect(create.execute(user)).rejects.toThrow();
    });

});
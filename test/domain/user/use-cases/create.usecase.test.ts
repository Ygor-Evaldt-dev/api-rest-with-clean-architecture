import { User } from "@/domain/user/user.entity";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { getTestModule } from "../get-test-module";

describe('create', () => {
    let create: Create;

    beforeAll(() => {
        const module = getTestModule();
        create = module.usecase.create;
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
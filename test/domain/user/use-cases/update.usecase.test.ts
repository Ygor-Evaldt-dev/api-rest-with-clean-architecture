import { User } from "@/domain/user//entity/user.entity";
import { getTestModule } from "../get-test-module";
import { Update } from "@/domain/user/use-cases/update.usecase";

describe('update', () => {
    let update: Update;

    beforeAll(() => {
        const module = getTestModule();
        update = module.usecase.update;
    });

    it('should update an exists user', async () => {
        const user = new User({
            id: '2d868fd5-37f8-491c-be04-122125f75eb2',
            email: 'teste_update@gmail.com',
            name: 'teste'
        });

        await expect(update.execute({
            id: user.id.value,
            user
        })).resolves.not.toThrow();
    });
});
import { getTestModule } from "../get-test-module";
import { Remove } from "../../../../src/domain/user/use-cases/remove.usecase";
import { User } from "../../../../src/domain/user//entity/user.entity";
import { UserModule } from "../../../../src/domain/user/user.module";

describe('remove', () => {
    let module: UserModule;
    let remove: Remove;

    beforeAll(async () => {
        module = getTestModule();
        remove = module.usecase.remove;
    });

    it('should delete an existing user', async () => {
        const id = '355a45ae-e752-470d-9a14-15a165f5d381';
        const user = new User({
            id,
            email: 'new_user@gmail.com',
            password: 'new_user_pass'
        });

        await module.usecase.create.execute(user);

        await expect(remove.execute(id)).resolves.not.toThrow();
    });
});
import { getTestModule } from "../get-test-module";
import { Remove } from "@/domain/user/use-cases/remove.usecase";
import { User } from "@/domain/user/user.entity";
import { UserModule } from "@/domain/user/user.module";

describe('remove', () => {
    let module: UserModule;
    let remove: Remove;

    beforeAll(async () => {
        module = getTestModule();
        remove = module.usecase.remove;
    });

    it('should delete an existing user', async () => {
        const id = '355a45ae-e752-470d-9a14-15a165f5d381';
        const user = new User('new_user@gmail.com', 'new_user_pass', '', id);

        await module.usecase.create.execute(user);

        await expect(remove.execute(id)).resolves.not.toThrow();
    });
});
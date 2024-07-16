import { getTestModule } from "../get-test-module";
import { User } from "@/domain/user/entity/user.entity";

describe('update', () => {
    const { createService, updateService, removeService } = getTestModule();
    let user: User;

    beforeAll(async () => {
        user = await createService.execute({
            email: 'teste_update@email.com',
            password: 'T3st3@update'
        });
    });

    afterAll(async () => {
        await removeService.execute(user.id.value);
    })

    it('should update an exists user', async () => {
        const exec = async () => await updateService.execute({
            id: user.id.value,
            email: user.email.complete
        })
        await expect(exec()).resolves.not.toThrow();
    });
});
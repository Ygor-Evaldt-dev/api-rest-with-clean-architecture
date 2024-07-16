import { FindUnique } from "../../../../src/domain/user/use-cases/find-unique.usecase";
import { getTestModule } from "../get-test-module";

describe('find unique', () => {
    let findUnique: FindUnique;

    beforeAll(() => {
        const module = getTestModule();
        findUnique = module.usecase.findUnique;
    });

    it('should return an user registred', async () => {
        const email = 'teste@gmail.com';
        const user = await findUnique.execute({ email });

        expect(user).toBeDefined();
        expect(user?.email.complete).toBe(email);
    });

    it('should return null if user if not registred', async () => {
        const user = await findUnique.execute({
            email: 'any_email@gmail.com'
        });
        expect(user).toBeNull();
    });

});
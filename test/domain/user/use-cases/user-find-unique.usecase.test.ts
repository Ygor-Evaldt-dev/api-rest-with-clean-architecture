import { User } from "@/domain/user/entity/user.entity";
import { getTestModules, getExistingUser } from "../../../common/shared";

describe("user find unique use case", () => {
    const { userModule } = getTestModules();
    let user: User;

    beforeAll(async () => {
        user = await getExistingUser();
    });

    afterAll(async () => {
        await userModule.remove.execute(user.id.value);
    });

    it("should throw database exception if id is an invalid uuid v4", async () => {
        const id = "any";
        const exec = async () => await userModule.find.execute({ id });

        await expect(exec()).rejects.toThrow();
    });

    it("should throw not found exception if there isn't user with the searched id", async () => {
        const id = "d48b21e5-ceb6-4426-affb-ad10665a51a9";
        const exec = async () => await userModule.find.execute({ id });

        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    it("should throw not found exception if there isn't user with the searched email", async () => {
        const email = "any";
        const exec = async () => await userModule.find.execute({ email });

        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    it("should return existing user by id", async () => {
        const existingUser = await userModule.find.execute({ id: user.id.value })

        expect(existingUser).toBeDefined();
        expect(existingUser.id.value).toBe(user.id.value);
    });

    it("should return existing user by email", async () => {
        const existingUser = await userModule.find.execute({ email: user.email.complete })

        expect(existingUser).toBeDefined();
        expect(existingUser.email.complete).toBe(user.email.complete);
    });
});
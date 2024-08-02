import { getTestModules, getExistingUser } from "../../../common/shared";
import { User } from "@/domain/user/entity/user.entity";

describe("user remove use case", () => {
    const { userModule } = getTestModules();
    let user: User

    beforeAll(async () => {
        user = await getExistingUser();
    });

    it("should throw not found exception if user is not registred", async () => {
        const nonExistingId = "d5c650d0-b6e4-4261-8739-de6660f57bf4";
        const exec = async () => await userModule.remove.execute(nonExistingId);

        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    it("should throw database exception if id is an invalid uuid V4", async () => {
        const uuidV4 = "invalid";
        const exec = async () => await userModule.remove.execute(uuidV4);

        await expect(exec()).rejects.toThrow();
    });

    it("should remove an existing user", async () => {
        const exec = async () => await userModule.remove.execute(user.id.value);
        await expect(exec()).resolves.not.toThrow();
    });
});
import { getTestModule } from "./get-test-module";

describe("find unique", () => {
    const { findService } = getTestModule();
    const email = "admin@gmail.com";

    it("should return a registred user", async () => {
        const user = await findService.execute({ email });

        expect(user).toBeDefined();
        expect(user?.email.complete).toBe(email);
    });

    it("should throw not found exception if user if not registred", async () => {
        const exec = async () =>
            await findService.execute({
                email: "any_email@gmail.com"
            });
        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });
});

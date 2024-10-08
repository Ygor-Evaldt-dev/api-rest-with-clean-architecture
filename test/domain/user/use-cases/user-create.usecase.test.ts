import { getTestModules, userDto } from "../../../common/shared";

describe("user create use case", () => {
    const { userModule } = getTestModules();
    const { create, find, remove } = userModule;

    afterAll(async () => {
        const user = await find.execute({ email: userDto.email });
        await remove.execute(user.id.value);
    });

    it("should throw bad request error if email is invalid", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            email: "invalid"
        });
        await expect(exec()).rejects.toThrow("E-mail inválido");
    });

    it("should throw bad request error if password is too short", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            password: "any"
        });
        await expect(exec()).rejects.toThrow("A senha deve conter no mínimo 8 caracteres");
    });

    it("should throw bad request error if password is too easy", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            password: "anypassword"
        });
        await expect(exec()).rejects.toThrow("A senha deve conter no mínimo 1 número, 1 letra maiúscula e 1 caractere especial");
    });

    it("should throw bad request error if password has white spaces", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            password: "S3nh@teste "
        });
        await expect(exec()).rejects.toThrow("A senha não pode conter espaços em branco");
    });

    it("should throw bad request error if name is to short", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            name: "ab"
        });
        await expect(exec()).rejects.toThrow("Nome deve ter no mínimo 3 caracteres");
    });

    it("should throw bad request error if name is to long", async () => {
        const exec = async () => await create.execute({
            ...userDto,
            name: "llum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborummmms"
        });
        await expect(exec()).rejects.toThrow("Nome deve ter no máximo 150 caracteres");
    });

    it("should create a new user", async () => {
        const exec = async () => await create.execute(userDto);
        await expect(exec()).resolves.not.toThrow();
    });
});
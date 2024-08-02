import { User } from "@/domain/user/entity/user.entity";
import { getExistingUser, getTestModules, userDto } from "../../../common/shared";

describe("user update use case", () => {
    const { userModule } = getTestModules();
    let user: User;

    beforeAll(async () => {
        user = await getExistingUser();
    });

    afterAll(async () => {
        await userModule.remove.execute(user.id.value);
    });

    it("should throw not found exception if user is not registred", async () => {
        const exec = async () => await userModule.update.execute({
            ...userDto,
            id: "d5c650d0-b6e4-4261-8739-de6660f57bf4"
        });

        await expect(exec()).rejects.toThrow("Usuário não cadastrado");
    });

    it("should throw bad request error if email is invalid", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            email: "invalid"
        });
        await expect(exec()).rejects.toThrow("E-mail inválido");
    });

    it("should throw bad request error if password is too short", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            password: "any"
        });
        await expect(exec()).rejects.toThrow("A senha deve conter no mínimo 8 caracteres");
    });

    it("should throw bad request error if password is too easy", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            password: "anypassword"
        });
        await expect(exec()).rejects.toThrow("A senha deve conter no mínimo 1 número, 1 letra maiúscula e 1 caractere especial");
    });

    it("should throw bad request error if password has white spaces", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            password: "S3nh@teste "
        });
        await expect(exec()).rejects.toThrow("A senha não pode conter espaços em branco");
    });

    it("should throw bad request error if name is to short", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            name: "ab"
        });
        await expect(exec()).rejects.toThrow("Nome deve ter no mínimo 3 caracteres");
    });

    it("should throw bad request error if name is to long", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            name: "llum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborummmms"
        });
        await expect(exec()).rejects.toThrow("Nome deve ter no máximo 150 caracteres");
    });

    it("should update an existing user", async () => {
        const exec = async () => await userModule.update.execute({
            id: user.id.value,
            name: "Teste"
        });

        await expect(exec()).resolves.not.toThrow();
    });
});
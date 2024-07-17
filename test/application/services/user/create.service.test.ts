import { CreateUserDto } from "@/application/services/user/dtos/create-user.dto";
import { getTestModule } from "./get-test-module";

describe("create service", () => {
    const { createService, deleteService } = getTestModule();
    const dto: CreateUserDto = {
        email: "teste@email.com",
        password: "Senha@test3"
    }
    let userId = '';

    afterAll(async () => {
        await deleteService.execute(userId);
    });

    it("should create a new user", async () => {
        const user = await createService.execute(dto);
        userId = user.id.value;

        expect(user).toBeDefined();
        expect(user.id.value).toBe(userId);
    });

    it("should throw error if user is already registred", async () => {
        await expect(createService.execute(dto)).rejects.toThrow("Usuário já cadastrado");
    });
});

import { CreateUserDto } from "@/application/services/user/dtos/create-user.dto";
import { getTestModule } from "../get-test-module";

describe("create service", () => {
	const { createService } = getTestModule();
	const dto: CreateUserDto = {
		email: "teste1234@gmail.com",
		password: "Senha@test3"
	};

	it("should create a new user", async () => {
		await expect(createService.execute(dto)).resolves.not.toThrow();
	});

	it("should throw error if user is already registred", async () => {
		await expect(createService.execute(dto)).rejects.toThrow();
	});
});

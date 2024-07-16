import { getTestModule } from "../get-test-module";
import { User } from "@/domain/user/entity/user.entity";

describe("remove", () => {
	const { createService, removeService } = getTestModule();
	let id = "";

	beforeAll(async () => {
		const user: User = await createService.execute({
			email: "teste@email.com",
			password: "An1Passw0rd"
		});
		id = user.id.value;
	});

	it("should delete an existing user", async () => {
		await expect(removeService.execute(id)).resolves.not.toThrow();
	});
});

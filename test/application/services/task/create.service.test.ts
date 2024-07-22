import { Status } from "@/domain/shared/enums/status";
import { getTestModule } from "./get-test-module";

describe('create', () => {
    const { createService } = getTestModule();
    const dto = {
        title: "Teste",
        status: Status.pending,
        userId: "53211d23-a8e0-4c58-8857-91d19d64fe27"
    }

    it('should create new task', async () => {
        const task = await createService.execute(dto);
        expect(task).toHaveProperty("id");
    });
});
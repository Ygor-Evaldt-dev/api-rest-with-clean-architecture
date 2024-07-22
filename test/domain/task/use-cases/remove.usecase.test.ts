import { Task } from "@/domain/task/entity/task.entity";
import { getTestModule } from "../getTestModule";

describe("remove task", () => {
    const { createUseCase, removeUseCase } = getTestModule();
    const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";
    const task = new Task({
        title: "Tarefa deletada"
    });

    beforeAll(async () => {
        await createUseCase.execute({ userId, task });
    });

    it("should remove an existing task", async () => {
        const exec = async () => await removeUseCase.execute(task.id.value);
        await expect(exec()).resolves.not.toThrow();
    });

    it("should throw error if task is not registred", async () => {
        const exec = async () => removeUseCase.execute("any");
        await expect(exec()).rejects.toThrow();
    });
});
import { Task } from "@/domain/task/entity/task.entity";
import { getTestModule } from "../getTestModule";

describe("create task", () => {
    const { createUseCase, removeUseCase } = getTestModule();
    const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";
    const task = new Task({
        title: "Primeira tarefa"
    });

    afterAll(async () => {
        await removeUseCase.execute(task.id.value);
    })

    it("should create an new task to existing user", async () => {
        await expect(createUseCase.execute({
            userId,
            task
        })).resolves.not.toThrow();
    });

    it("should throw error if user is not registred", async () => {
        await expect(createUseCase.execute({
            userId: "any",
            task
        })).rejects.toThrow();
    });
});
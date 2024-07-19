import { Task } from "@/domain/task/entity/task.entity";
import { getTestingModule } from "../getTestingModule";

describe("update task", () => {
    const { createUseCase, updateUseCase, removeUseCase } = getTestingModule();
    const task = new Task({
        id: "53211d23-a8e0-4c58-8857-91d19d64fe10",
        title: "Segunda tarefa"
    });

    beforeAll(async () => {
        const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";
        await createUseCase.execute({ userId, task });
    });

    afterAll(async () => {
        await removeUseCase.execute(task.id.value);
    })

    it("should update a task", async () => {
        Object.assign(task, {
            description: {
                complete: "Descrição atualizada da tarefa 2"
            }
        })
        await expect(updateUseCase.execute(task)).resolves.not.toThrow();
    });

});
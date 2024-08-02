import { Task } from "@/domain/task/entity/task.entity";
import { getExistingTask, getTestModules } from "../../../common/shared";
import { User } from "@/domain/user/entity/user.entity";

describe("task remove use case", () => {
    const { taskModule, userModule } = getTestModules();
    let existingTask: Task;
    let existingUser: User;

    beforeAll(async () => {
        const { task, user } = await getExistingTask();
        existingTask = task;
        existingUser = user;
    });

    afterAll(async () => {
        await userModule.remove.execute(existingUser.id.value);
    });

    it("should throw database exception if task id is invalid uuid v4", async () => {
        const id = "invalid"
        const exec = async () => await taskModule.remove.execute(id);

        await expect(exec()).rejects.toThrow();
    });

    it("should throw not found exception if task is not registred", async () => {
        const id = "6dbbcf53-0fe8-4c49-8c40-cc19e287389f"
        const exec = async () => await taskModule.remove.execute(id);

        await expect(exec()).rejects.toThrow("Tarefa não cadastrada");
    });

    it("should remove an existing task", async () => {
        const exec = async () => await taskModule.remove.execute(existingTask.id.value);

        await expect(exec()).resolves.not.toThrow();
    });
});
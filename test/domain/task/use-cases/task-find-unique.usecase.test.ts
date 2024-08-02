import { Task } from "@/domain/task/entity/task.entity";
import { getExistingTask, getTestModules } from "../../../common/shared";
import { User } from "@/domain/user/entity/user.entity";

describe("task find unique use case", () => {
    const { taskModule, userModule } = getTestModules();
    let existingTask: Task;
    let existingUser: User;

    beforeAll(async () => {
        const { task, user } = await getExistingTask();
        existingTask = task;
        existingUser = user;
    });

    afterAll(async () => {
        await taskModule.remove.execute(existingTask.id.value);
        await userModule.remove.execute(existingUser.id.value);
    });

    it("should throw database exception if task id is invalid", async () => {
        const taskId = "invalid";
        const exec = async () => await taskModule.findUnique.execute(taskId);

        await expect(exec()).rejects.toThrow();
    });

    it("should throw not found exception if task is not registred", async () => {
        const taskId = "c2e3b028-9980-4bc7-80f2-1f80d9bd2ffb";
        const exec = async () => await taskModule.findUnique.execute(taskId);

        await expect(exec()).rejects.toThrow("Tarefa não cadastrada");
    });

    it("should return an existing task", async () => {
        const task = await taskModule.findUnique.execute(existingTask.id.value);

        expect(task).toBeDefined();
        expect(task.id.value).toBe(existingTask.id.value);
    });
});
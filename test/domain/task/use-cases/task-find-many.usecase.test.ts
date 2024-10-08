import { Task } from "@/domain/task/entity/task.entity";
import { User } from "@/domain/user/entity/user.entity";
import { getTestModules, createSomeTasks } from "../../../common/shared";
import { StatusEnum } from "@/domain/shared/enums/status.enum";

describe("task find many use case", () => {
    const { taskModule, userModule } = getTestModules();

    let tasksList: Task[];
    let existingUser: User

    beforeAll(async () => {
        const { tasks, user } = await createSomeTasks();
        tasksList = [...tasks];
        existingUser = user
    });

    afterAll(async () => {
        await Promise.all(
            tasksList.map(task => taskModule.remove.execute(task.id.value))
        );
        await userModule.remove.execute(existingUser.id.value);
    });

    it("should throw database exception if userId is an invalid uuid v4", async () => {
        const exec = async () => await taskModule.findMany.execute({
            page: 10,
            take: 1,
            filter: {
                userId: "any"
            }
        });

        await expect(exec()).rejects.toThrow();
    });

    it("should throw not found exception if there are no tasks in the page", async () => {
        const exec = async () => await taskModule.findMany.execute({
            page: 10,
            take: 1,
            filter: {
                userId: existingUser.id.value
            }
        });

        await expect(exec()).rejects.toThrow("Nenhuma tarefa encontrada");
    });

    it("should return page 0 with 2 tasks", async () => {
        const { page, take, totalPages, totalRegisters, registers } = await taskModule.findMany.execute({
            page: 0,
            take: 2,
            filter: {
                userId: existingUser.id.value
            }
        });

        expect(page).toBe(0);
        expect(take).toBe(2);
        expect(totalRegisters).toBe(3);
        expect(totalPages).toBe(2);
        expect(registers[0].id).toBeDefined();
        expect(registers.length).toBe(take);
    });

    it("should return page with taks filtred by title", async () => {
        const { page, take, totalPages, totalRegisters, registers } = await taskModule.findMany.execute({
            page: 0,
            take: 3,
            filter: {
                userId: existingUser.id.value,
                title: "teste"
            }
        });

        expect(page).toBe(0);
        expect(take).toBe(3);
        expect(totalRegisters).toBe(3);
        expect(totalPages).toBe(1);

        registers.forEach(task => {
            let title = task.title.complete.toLocaleLowerCase();
            expect(title).toBeTruthy();
        });
    });

    it("should return page with taks filtred by status", async () => {
        const status = StatusEnum.pending;
        const { registers } = await taskModule.findMany.execute({
            page: 0,
            take: 10,
            filter: {
                userId: existingUser.id.value,
                status: "pendente" as StatusEnum
            }
        });

        expect(registers.length).toBe(1);
        expect(registers[0].status.value).toBe(status)
    });
});
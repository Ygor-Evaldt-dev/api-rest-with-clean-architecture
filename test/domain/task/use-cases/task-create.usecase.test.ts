import { getTestModules, getExistingUser, taskDto } from "../../../common/shared";

describe('task create use case', () => {
    const { taskModule, userModule } = getTestModules();
    let userId: string;

    beforeAll(async () => {
        const user = await getExistingUser();
        userId = user.id.value;
    });

    afterAll(async () => {
        const response = await taskModule.filter.execute({ page: 0, take: 1, title: taskDto.title, userId });
        const task = response.registers[0];

        await taskModule.remove.execute(task?.id?.value);
        await userModule.remove.execute(userId)
    });

    it("should throw error if title is empty", async () => {
        const exec = async () => await taskModule.create.execute({
            title: "",
            userId
        });

        await expect(exec()).rejects.toThrow("O título deve conter no mínimo 1 caractere");
    });

    it("should throw error if title is empty", async () => {
        const exec = async () => await taskModule.create.execute({
            title: "tolongtitletolongtitletolongtitletolongtitletolongtitle",
            userId
        });

        await expect(exec()).rejects.toThrow("O título deve conter no máximo 50 caracteres");
    });

    it("should create a new task", async () => {
        const exec = async () => await taskModule.create.execute({
            ...taskDto,
            userId
        });

        await expect(exec()).resolves.not.toThrow();
    });
});

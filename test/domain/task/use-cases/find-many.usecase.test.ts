import { Task } from "@/domain/task/entity/task.entity";
import { getTestModule } from "../getTestModule";

describe("find many", () => {
    const { createUseCase, findManyUseCase, removeUseCase } = getTestModule();
    const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";

    beforeAll(async () => {
        const promises = [
            createUseCase.execute({
                userId,
                task: new Task({ title: "Exemplo" })
            }),
            createUseCase.execute({
                userId,
                task: new Task({ title: "Exemplo" })
            }),
            createUseCase.execute({
                userId,
                task: new Task({ title: "Exemplo" })
            })
        ];

        await Promise.all(promises);
    })

    afterAll(async () => {
        const registers = await findManyUseCase.execute({
            page: 0,
            take: 50
        });
        const promises = registers.map(register => removeUseCase.execute(register.id.value));
        await Promise.all(promises);
    });

    it('should return a page with registers', async () => {
        const registers = await findManyUseCase.execute({
            page: 0,
            take: 2
        });

        expect(registers.length).toBe(2);
    });

    it('should return an empty array if no task is founded', async () => {
        const registers = await findManyUseCase.execute({
            page: 100000000,
            take: 1
        });

        expect(registers.length).toBe(0);
    });
});
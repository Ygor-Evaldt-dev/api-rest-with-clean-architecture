import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../../presentation/util";
import { createSomeTasks, userDto } from "../../../common/shared";
import { Task } from "@/domain/task/entity/task.entity";
import { HttpStatus } from "@/common/utils/http-status";
import { Email } from "@/domain/shared/value-objects";
import { User } from "@/domain/user/entity/user.entity";

describe("task find many controller", () => {
    let axiosInstance: AxiosInstance;
    let registers: Task[]
    let tempUser: User;

    beforeAll(async () => {
        const { tasks, user } = await createSomeTasks();
        registers = [...tasks];

        axiosInstance = await authenticatedAxiosInstance({
            email: new Email(user.email.complete),
            password: userDto.password
        });

        tempUser = user;
    });

    afterAll(async () => {
        await Promise.all(
            registers.map((task: Task) => axiosInstance.delete(`/task/${task.id.value}`))
        );
        await axiosInstance.delete(`/user/${tempUser.id.value}`)
    });

    it("should return http status code 404 not found is any task has found", async () => {
        try {
            const page = 10;
            const take = 25
            await axiosInstance.get(`/task/${page}/${take}`)
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status code 200 and user's task", async () => {
        const page = 0;
        const take = 25
        const { status, data } = await axiosInstance.get(`/task/${page}/${take}`);

        expect(status).toBe(HttpStatus.OK);
        expect(data.totalRegisters).toBeGreaterThan(0);
    });
});
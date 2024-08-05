import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../../presentation/util";
import { createSomeTasks, getExistingTask, userDto } from "../../../common/shared";
import { Task } from "@/domain/task/entity/task.entity";
import { HttpStatus } from "@/common/utils/http-status";
import { Email } from "@/domain/shared/value-objects";
import { User } from "@/domain/user/entity/user.entity";

describe("task remove controller", () => {
    let axiosInstance: AxiosInstance;
    let tempTask: Task;
    let tempUser: User;

    beforeAll(async () => {
        const { task, user } = await getExistingTask();

        axiosInstance = await authenticatedAxiosInstance({
            email: new Email(user.email.complete),
            password: userDto.password
        });

        tempUser = user;
        tempTask = task;
    });

    afterAll(async () => {
        await axiosInstance.delete(`/user/${tempUser.id.value}`);
    });

    it("should return http status code 404 not found is any task has found", async () => {
        try {

            await axiosInstance.delete(`/task/66d20469-251c-4a46-9dab-728ccddb1ddb`);
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status code 200 and delete the existing task", async () => {
        const { status } = await axiosInstance.delete(`/task/${tempTask.id.value}`);
        expect(status).toBe(HttpStatus.OK);
    });
});
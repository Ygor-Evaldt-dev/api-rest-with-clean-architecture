import { Task } from "@/domain/task/entity/task.entity";
import { getTestModules, taskDto, userDto } from "./";
import { User } from "@/domain/user/entity/user.entity";

export async function getExistingTask(): Promise<{ task: Task, user: User }> {
    const { userModule, taskModule } = getTestModules();

    await userModule.create.execute(userDto);
    const user = await userModule.find.execute({ email: userDto.email });

    await taskModule.create.execute({ ...taskDto, userId: user.id.value });
    const { registers } = await taskModule.filter.execute({ page: 0, take: 1, title: taskDto.title, userId: user.id.value });

    return ({
        task: registers[0],
        user
    });
}
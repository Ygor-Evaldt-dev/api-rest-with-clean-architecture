import { Task } from "@/domain/task/entity/task.entity";
import { getTestModules, taskDto, userDto } from "./";

export async function getExistingTask(): Promise<Task> {
    const { userModule, taskModule } = getTestModules();

    await userModule.create.execute(userDto);
    const user = await userModule.find.execute({ email: userDto.email });

    await taskModule.create.execute({ ...taskDto, userId: user.id.value });
    const { registers } = await taskModule.filter.execute({ page: 0, take: 1, title: taskDto.title });

    return registers[0];
}
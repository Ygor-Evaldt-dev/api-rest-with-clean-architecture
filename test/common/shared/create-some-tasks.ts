import { User } from "@/domain/user/entity/user.entity";
import { getTestModules, taskDto, userDto } from "./";
import { Task } from "@/domain/task/entity/task.entity";

export async function createSomeTasks(): Promise<{ tasks: Task[], user: User }> {
    const { userModule, taskModule } = getTestModules();

    await userModule.create.execute(userDto);
    const user = await userModule.find.execute({ email: userDto.email });

    const dtos = [
        taskDto,
        { ...taskDto, title: "Tarefa de teste 02" },
        { ...taskDto, title: "Tarefa de teste 03" }
    ]
    await Promise.all(dtos.map(dto => taskModule.create.execute({ ...dto, userId: user.id.value })));

    const { registers } = await taskModule.findMany.execute({
        page: 0,
        take: 25,
        userId: user.id.value
    });

    return ({
        tasks: registers,
        user
    });
}
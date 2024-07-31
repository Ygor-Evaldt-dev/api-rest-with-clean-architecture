import { PrismaClient } from "@prisma/client";
import { ITaskRepository } from "@/domain/ports";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { TaskModule } from "@/application/modules/task.module";

export function getTestModule() {
    const prisma = new PrismaClient();
    const repository: ITaskRepository = new TaskPrismaRepository(prisma);
    const module = new TaskModule(repository);

    return module;
}

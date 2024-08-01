import { PrismaClient } from "@prisma/client";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { TaskCreate, TaskFindMany, TaskUpdate, TaskRemove } from "@/domain/task/use-cases";

export function getTestModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new TaskCreate(taskRepository);
    const findManyUseCase = new TaskFindMany(taskRepository);
    const updateUseCase = new TaskUpdate(taskRepository);
    const removeUseCase = new TaskRemove(taskRepository);

    return ({
        taskRepository,
        createUseCase,
        findManyUseCase,
        updateUseCase,
        removeUseCase
    });
}
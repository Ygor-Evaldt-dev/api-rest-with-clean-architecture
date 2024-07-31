import { PrismaClient } from "@prisma/client";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { TaskCreate, TaskFindManyUseCase, TaskUpdate, TaskRemoveUseCase } from "@/domain/task/use-cases";

export function getTestModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new TaskCreate(taskRepository);
    const findManyUseCase = new TaskFindManyUseCase(taskRepository);
    const updateUseCase = new TaskUpdate(taskRepository);
    const removeUseCase = new TaskRemoveUseCase(taskRepository);

    return ({
        taskRepository,
        createUseCase,
        findManyUseCase,
        updateUseCase,
        removeUseCase
    });
}